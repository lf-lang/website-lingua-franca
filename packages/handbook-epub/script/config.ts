import { join, resolve } from "path"

const packageRoot = resolve(join(__dirname, "..", "..", ".."));
const websiteRoot = resolve(join(packageRoot, "..", "lingua-franca"))

export const gitRoot = resolve(join(packageRoot, "..", "..", ".git"));
export const handbookPath = resolve(join(packageRoot, "..", "documentation", "copy", "en", "topics"));
export const scssFiles = [
  join(websiteRoot, "src", "components", "layout", "main.scss"),
  join(websiteRoot, "src", "templates", "documentation.scss"),
  join(websiteRoot, "src", "templates", "markdown.scss"),
];
export const epubOutputPath = join(packageRoot, "dist", "handbook.epub");
export const websiteEpubOutputPath = join(websiteRoot, "static", "assets", "lingua-franca-handbook.epub");
export const htmlOutputPath = join(packageRoot, "assets");
export const pdfOutputPath = join(packageRoot, "dist");
export const websitePdfOutputPath = join(websiteRoot, "static", "assets")
