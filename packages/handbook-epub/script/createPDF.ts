#!/usr/bin/env ts-node

import { writeFileSync, copyFileSync } from "fs";
import {
  generateV2Markdowns,
  getGitSHA,
  getHTML,
  replaceAllInString,
} from "./setupPages.js";
import { getDocumentationNavForLanguage } from "../../lingua-franca/src/lib/documentationNavigation.js";
import { chromium } from "playwright";
import sass from "sass";
import { join } from "path";
import { htmlOutputPath, pdfOutputPath, scssFiles, websitePdfOutputPath } from "./config.js";

const markdowns = generateV2Markdowns();

const targetLanguages = ["c", "cpp", "py", "ts", "rs"];
// Grab the handbook nav, and use that to pull out the order

const bookMetadata = {
  title: "Lingua Franca Handbook",
  author: "Lingua Franca Open Source Contributors",
  authorUrl: "https://www.lf-lang.org/",
  modified: new Date(),
  source: "https://www.lf-lang.org/",
  description: "An offline guide to learning Lingua Franca.",
  publisher: "UC Berkeley",
  subject: "Non-fiction",
  includeTOC: true,
  ibooksSpecifiedFonts: true,
};

// Convert the important SCSS files to JS for the book:

const generateCSS = (lang: string) => {
  console.log(`Generating CSS from SCSS files for ${lang}`);

  const css = scssFiles
    .map(path => sass.compile(path).css.toString())
    .join("\n\n");

  var langCSS = `
  .not-in-pdf {
    display: none;
  }
  `

  targetLanguages.forEach(element =>{
    if(element === lang){
      langCSS +=
      `
      .language-lf-${element} {
        display: block; /* Shows for this PDF. */
      }
      .lf-${element} {
        display: inline; /* Shows for this PDF. */
      }
      `
    }else{
      langCSS +=
      `
      .language-lf-${element} {
        display: none; /* Don't show for this PDF */
      }
      .lf-${element} {
        display: none; /* Don't show for this PDF */
      }
      `
    }
  })
  const thisCSS = `
html {
  background-color: #EEEEEE;
}

body {
  padding-top: 5rem;
  -webkit-print-color-adjust: exact !important;
}

article {
  page-break-after: always;
  margin-bottom: 4rem;
}

pre {
  page-break-inside:avoid
}

.raised {
  box-shadow: none;
}

#pdf-intro {
  page-break-after: always
}

#pdf-intro table {
  width: 600px;
  margin: 0 auto;
}

pre .error-behind {
  color: white;
}

    `;
  return css + langCSS + thisCSS;
};

const generateHTML = async (lang: string) => {
  const handbookNavigation = getDocumentationNavForLanguage("en");
  // FIXME: Should include reference section as well.
  const handbook = handbookNavigation.find((i) => i.title === "Writing Reactors");
  let html = "<html>";

  const css = generateCSS(lang);

  // prettier-ignore
  // const style = readFileSync(join(__dirname, "..", "assets", "ebook-style.css"), "utf8");
  html += `<head><style type='text/css'>${css}</style></head>`;

  html += "<body><div id='handbook-content'>";

  const date = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const sha = getGitSHA().slice(0, 6);
  html += `
  <div id="pdf-intro">
  <center style="page-break-after: always">
    <img src="./Lingua_Franca.png" width=200>
    <p style='width: 340px;'>This copy of the Lingua Franca handbook for the ${lang} target was created on ${date} against
    commit
    <a href="https://github.com/lf-lang/website-lingua-franca/tree/${sha}"><code>${sha}</code></a>.
    </p>
  </center>
  `;

  const allPages = [];

  for (const item of handbook!.items!) {
    if (item.permalink) {
      allPages.push(item);
    }
    if (item.items) {
      for (const subitem of item.items) {
        allPages.push(subitem);
      }
    }
  }

  html += tableOfContents(allPages);
  html += "</div>"; //   <div id="pdf-intro">

  for (const item of allPages) {
    const i = allPages.indexOf(item);
    html += await addHandbookPage(item.permalink!, i);
  }

  writeFileSync(join(htmlOutputPath, `all_lf-${lang}.html`), html);
};

const generatePDF = async (lang: string) => {
  console.log(`Starting up Chromium for ${lang}`);
  const browser = await chromium.launch(); // Or 'firefox' or 'webkit'.
  const page = await browser.newPage();
  console.log(`Loading the html for ${lang}`);
  await page.goto("file://" + join(htmlOutputPath, `all_lf-${lang}.html`));

  console.log(`Rendering the PDF for ${lang}`);
  await page.emulateMedia({ media: "screen" });
  await page.pdf({
    path: join(pdfOutputPath, `handbook_lf-${lang}.pdf`),
    margin: { top: 40, bottom: 60 },
  });

  console.log(`Finished pdf for ${lang}`);
  await browser.close();
};

const addHandbookPage = async (id: string, index: number) => {
  const md = markdowns.get(id);
  if (!md)
    // prettier-ignore
    throw new Error("Could not get markdown for " + id + `\n\nAll MDs: ${Array.from(markdowns.keys())}`);

  const title = md.data.title;
  const prefix = `<h1 style='margin: 0 2rem' id='title-${index}'>${title}</h1><article><div class="whitespace raised"><div class="markdown">`;
  const suffix = "</div></div></article>";

  const html = await getHTML(md.content, {});
  const edited = replaceAllInString(html, {
    'a href="/': 'a href="https://www.lf-lang.org/',
  });

  const content = prefix + edited + suffix;
  return content;
};

const tableOfContents = (items: any[]) => {
  const start = `<h1 style='margin: 0 2rem; margin-bottom: 4rem;'>Table of Contents</h1><table><tbody>`;
  const middle = items.map(
    (item, i) =>
      `<tr><td style='width: 200px;'><a href="#title-${i}">${item.title}</a></td><td>${item.oneline}</td></tr>`
  );
  const end = `</tbody></table>`;
  return start + middle.join("\n") + end;
};

const go = async () => {
  targetLanguages.forEach(async lang => {
    await generateHTML(lang);
    await generatePDF(lang);
    copyFileSync(
      join(pdfOutputPath, `handbook_lf-${lang}.pdf`),
      // prettier-ignore
      join(websitePdfOutputPath, `lingua-franca-handbook_lf-${lang}.pdf`)
    );
  });
};

go();
