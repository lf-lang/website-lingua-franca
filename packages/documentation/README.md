# Documentation

This package serves as the entry point for adding handbook-specific pages. These are the pages that appear in the **handbook** portion of the web page as well as the generated Epub and PDF documentation.

Each documentation file is a markdown file with the following steps needed to add them to the handbook.

1. Under `copy/en` is the directory structure for the handbook. It contains the following subdirectories:
   developer obsolete reference tools
   less-developed preliminary target topics

   - **topics**: Tutorial-style documentation supporting all target languages.
   - **target**: Documentation specific to each target language.
   - **tools**: Documentation for IDEs and command-line tools.
   - **reference**: Detailed documentation for expressions, target properties, etc.
   - **developer**: Information for developers (coding style, tooling, etc.)
   - **preliminary**: Documentation for tools or features that at early stages of development.
   - **less-developed**: Documentation for incomplete or speculative work.
   - Note: By default, the Epub/PDF is only populated with pages organized under **topics**. **FIXME:** This needs to be changed to include also the reference section.

2. At the top of each markdown page, the following blurb instructs the Gatsby website builder to automatically create a page with title _YOUR_TITLE_HERE_ at location `/docs/handbook/PERMALINK_LOCATION`:

```
---
title: YOUR_TITLE_HERE
layout: docs
permalink: /docs/handbook/PERMALINK_LOCATION
oneline: ONE_LINE_HERE
preamble: >
---
```

3. To have a page appear in the table of contents in the sidebar, the page must be added to the following script file: `packages/documentation/scripts/generateDocsNavigationPerLanguage.js`. This JavaScript file defines
   - This TS file defines the documentation structure that shows up on the sidebar and docs page. The key data structure is `handbookPages`, which lists entries like this:
   ```
   {
    title: "Resources",
    summary: "Overview of the project.",
    chronological: true,
    items: [
      { file: "topics/Overview.md" },
      { file: "topics/Tutorial Video.md" },
    ],
   },
   ```
   - The layers may be nested by including structures like this within the `items` field.
   - Additional information of how to add attributes can be found at the top of the `generateDocsNavigationPerLanguage.js` file.
4. To include your file under a layer, simply add a file keypair using relative paths to `copy/en`
   - Example: if you want to include a file with the following path
     `packages/documentation/copy/en/topics/Overview.md`
   - Then create a file attribute as so under an items object:
     `{ file: "topics/Overview.md" },`
5. Whenever the structure is changed, simply rerun `yarn bootstrap` to propagate changes to lingua-franca.

**NOTE**: Be sure the titles in your files are unique or yarn will get confused about which file to show.

## Target-Specific Documentation

The handbook documentation pages include a target language selector that specifies the target language in which to show examples. To add target-specific content to a markdown file, the content must have HTML class `lf-T`, where `T` is one of `c`, `cpp`, `py`, `ts`, or `rs`. A code block specific to C, for example, can be given as:

```
\`\`\`lf-c
    ... your code here ...
\`\`\`
```

Arbitrary content can be put with `div` of `span` with the appropriate class(es). For example, content that is relevant to only C and C++ can be surrounded with:

```
<div class="lf-c lf-cpp">

    ... your markdown content here ...

</div>
```

Note that these `<div>` lines, for some inexplicable reason, need to be surrounded by blank lines.

## Inserting Target-Specific Documentation from Source Files

If you insert the following line into a source Markdown file:

```
$insert(Name)$
```

then you can run the following script:

```
node packages/documentation/scripts/preprocessMarkdown.js yourMarkdownFile.md
```

This script will replace that line with something of the form:

```
$start(Name)$

\`\`\`lf-c
  ... C target code here
\`\`\`

\`\`\`lf-cpp
  ... Cpp target code here
\`\`\`
...
$end(Name)$
```

The code inserted is take from files located here:

```
packages/documentation/code/T/src
```

where `T` is one of `c`, `cpp`, etc.

If you re-run the same script on the same Markdown file, it will update the code blocks with the latest version in the above directory. The code will be expected to be in `Name.lf` file. If no matching code is found, then an error message will be inserted instead into the Markdown file.
