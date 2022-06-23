if (process.env.BOOTSTRAPPING) {
  const chalk = require("chalk")
  const readline = require("readline")
  const blank = "\n".repeat(process.stdout.rows)
  console.log(blank)
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)

  // prettier-ignore
  console.log(`
  Bootstrapped. You can now run the site with ${chalk.greenBright.bold("yarn start")}.`)
  process.exit(0)
}
var lf = require("../documentation/scripts/linguaFrancaUtils.js");

// require("./scripts/ensureDepsAreBuilt")

// https://github.com/gatsbyjs/gatsby/issues/1457
require("ts-node").register({ files: true })
const { join } = require("path")

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.lf-lang.org/`,
  },
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    // SCSS provides inheritance for CSS and which pays the price for the dep
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      },
    },
    // PWA metadata
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lingua Franca Documentation`,
        short_name: `LF Docs`,
        start_url: `/`,
        background_color: `white`,
        theme_color: `#3178C6`,
        display: `standalone`,
        icon: `static/icons/lf-logo.png`,
      },
    },

    // Support for downloading or pre-caching pages, needed for PWAs
    // "gatsby-plugin-offline",

    // Creates TS types for queries during `gatsby dev`
    {
      resolve: "gatsby-plugin-typegen",
      options: {
        // Ensure it works in a monorepo
        outputPath: __dirname + "/src/__generated__/gatsby-types.ts",
      },
    },

    // Support ts/tsx files in src
    "gatsby-plugin-typescript",
    // SEO
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // Skip handbook v2 from appearing in search
        excludes: [`*/vo/*`],
      },
    },
    // Lets you edit the head from inside a react tree
    "gatsby-plugin-react-helmet",
    // Grabs the old handbook markdown files
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../documentation/copy`,
        name: `documentation`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/../../img`,
        name: `img`,
      },
    },
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyDefault: "en",
        useLangKeyLayout: true,
      },
    },

    // Markdown support, and markdown + react
    // `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `lf-syntax-highlighting`,
          `gatsby-remark-emoji`,
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              showCaptions: false
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          "gatsby-remark-autolink-headers",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
    `gatsby-plugin-sharp`,
    // Finds auto-generated <a>s and converts them
    // into Gatsby Links at build time, speeding up
    // linking between pages.
    {
      resolve: `gatsby-plugin-catch-links`,
      options: {
        excludePattern: /(sandbox|play|dev)/,
      },
    },
    "gatsby-plugin-client-side-redirect",
  ],
}
