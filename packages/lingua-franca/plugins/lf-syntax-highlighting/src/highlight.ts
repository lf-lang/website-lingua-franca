import fs from "fs"
import path from "path"
import * as vsctm from "vscode-textmate"
import { Config } from "./config.js"
import * as oniguruma from "vscode-oniguruma"

/**
 * Return a Promise that gives the contents of a file.
 * @param p A path to the file relative to the location of this script.
 */
function readFile(p: string) {
    return new Promise((resolve, reject) => {
      return fs.readFile(
        path.resolve(__dirname, p),
        (error: any, data: any) => error ? reject(error) : resolve(data)
      );
    })
}

const wasmBin = fs.readFileSync(path.join(__dirname, Config.onigurumaParser)).buffer;
const vscodeOnigurumaLib = oniguruma.loadWASM(wasmBin).then(() => {
    return {
        createOnigScanner(patterns: any) { return new oniguruma.OnigScanner(patterns); },
        createOnigString(s: string) { return new oniguruma.OnigString(s); }
    };
});

const registry = new vsctm.Registry({
    onigLib: vscodeOnigurumaLib,
    loadGrammar: async (scopeName: string) => {
      let grammarFile: string = ""
      for (const language of Config.languages) {
        if (scopeName == language.scopeName) {
          grammarFile = language.grammarFile
          break
        }
      }
      if (grammarFile !== "") {
        const data: any = await readFile(grammarFile)
        return vsctm.parseRawGrammar(data.toString(), grammarFile)
      }
      console.warn(`Unknown scope name: ${scopeName}`)
      return Promise.resolve(null)
    }
});

/**
 * Initialize the syntax highlighter based on any implicit code (e.g., the target declaration) that
 * may have been omitted from the user-visible text.
 * @param lang The language of the code to be highlighted.
 * @param code The code to be highlighted.
 * @param grammar The set of grammar rules to use for highlighting.
 * @returns The implicit initial state of the syntax highlighter.
 */
function implicitRuleStackFor(
  lang: string | undefined,
  code: string,
  grammar: vsctm.IGrammar
): vsctm.StackElement | null {
  if (!lang) return null
  if (lang.trim() === "lf") return null
  if (!lang.includes("lf")) return null
  if (/target\s+(C|CCpp|Cpp|Python|Rust|TypeScript)/g.test(code)) return null
  let languageName: string | null = null
  if (!lang.includes("-")) {
    console.error(
      "Language \"lf\" specified via the language label \"" + lang + "\", but target language is"
      + " unclear. Required format is lf-<target language name>."
    )
    return null
  }
  const lower = lang.split("-").slice(1).join("-").toLowerCase()
  for (const language of Config.languages) {
    if (
      lower == language.canonicalName.toLowerCase()
      || language.aliases.map(it => it.toLowerCase()).some(it => lower === it)
    ) {
      languageName = language.canonicalName
      break
    }
  }
  let { ruleStack } = grammar.tokenizeLine("target " + languageName + ";", null)
  return ruleStack
}

/**
 * Replace literal text with its corresponding escaped HTML representation.
 * @param code Code to be escaped.
 * @returns The HTML representation of the given code.
 */
function escapeHtml(code: string): string {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

/**
 * Annotate the given code using HTML.
 * @param code A block of code.
 * @param grammar The grammar rules with which to annotate the code.
 * @param lang The language of the code block.
 * @returns The HTML representation of the annotated code block.
 */
function annotateCode(code: string, grammar: vsctm.IGrammar | undefined, lang: string): string {
  if (!grammar) return escapeHtml(code)
  let prevState: vsctm.StackElement | null = implicitRuleStackFor(lang, code, grammar)
  let ret: string = ""
  for (const line of code.split("\n")) {
    let result: vsctm.ITokenizeLineResult = grammar.tokenizeLine(line, prevState)
    prevState = result.ruleStack
    if (result.stoppedEarly) {
      console.error("Tokenization stopped early due to timeout.")
      continue
    }
    let annotatedLine = ""
    let lengthAppended = 0
    for (const token of result.tokens) {
      annotatedLine += escapeHtml(line.substring(lengthAppended, token.startIndex))
      annotatedLine += `<span class="${token.scopes.join(" ").replace(/\./g, "-")}">${
        escapeHtml(line.substring(token.startIndex, token.endIndex))
      }</span>`
      lengthAppended = token.endIndex
    }
    annotatedLine += escapeHtml(line.substring(lengthAppended, line.length))
    ret += annotatedLine + "\n"
  }
  return ret
}

type Node = {
  type: string,
  children: Node[],
  value: string
}

/**
 * Visit and transform a Markdown AST.
 * @param ast A Markdown AST.
 * @param type The type of the nodes that should be transformed.
 * @param transform The function with which to transform the selected nodes.
 */
function visit(ast: Node, type: string, transform: (node: Node) => void) {
  if (!ast) return;
  if (ast.type == type) transform(ast);
  if (!ast.children) return;
  for (const child of ast.children) {
    visit(child, type, transform);
  }
}

/**
 * Annotate the code blocks appearing in the given Markdown AST.
 * @param param0 The Markdown AST to transform.
 * @param pluginOptions Options passed to the highlighting plugin.
 * @returns The transformed AST.
 */
export const processAST = async ({ markdownAST }, pluginOptions) => {
  const grammars: Map<string, vsctm.IGrammar> = new Map()
  for (const language of Config.languages) {
    const grammar = await registry.loadGrammar(language.scopeName)
    if (grammar) {
      for (const name of [language.canonicalName, ...language.aliases]) {
        grammars.set(name.toLowerCase(), grammar)
      }
    } else {
      console.error("Failed to load grammar corresponding to " + language.scopeName)
    }
  }
  visit(markdownAST, "code", (node) => {
    node.type = "html"
    const lang: string = (node.hasOwnProperty("lang") && node["lang"]) ? node["lang"] : "text"
    const key: string | undefined = lang.includes("lf") ? "lf" : lang.toLowerCase()
    const annotated = annotateCode(node.value, grammars.get(key), lang)
    node.value = `<pre class="source-lf language-${lang}">${annotated}</pre>`
  })
  return markdownAST
}
