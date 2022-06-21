import * as React from "react"
import { useEffect } from "react"

import "./SiteFooter.scss"
import { createIntlLink } from "../IntlLink"
import { whenEscape } from "../../lib/whenEscape"
import { Customize } from "./SiteFooter-Customize"

export type Props = {
  lang: string
  suppressCustomization?: true
  suppressDocRecommendations?: true
}

const useLinguaFrancaLinks = [
  {
    title: "Get Started",
    url: "/docs/handbook/overview",
  },
  {
    title: "Download",
    url: "/download",
  },
  {
    title: "Why Lingua Franca",
    url: "/",
  },
  {
    title: "Publications",
    url: "/publications-and-presentations",
  },
]

const communityLinks = [
  {
    title: "Get Help",
    url: "/community",
  },
  {
    title: "GitHub Repo",
    url: "https://github.com/lf-lang/lingua-franca",
  },
  {
    title: "@thelflang",
    url: "https://twitter.com/thelflang",
  },
  {
    title: "Web Repo",
    url: "https://github.com/lf-lang/website-lingua-franca",
  },
  {
    title: "Slack",
    url: "https://join.slack.com/t/lf-community/shared_invite/zt-1b4egenxd-Dz~uG5Ps6ce71pgJG02cjw",
  },
]

const faviconForURL = (url: string) => {
  switch (url) {
    case "https://github.com/lf-lang/website-lingua-franca":
    case "https://github.com/lf-lang/lingua-franca":
      return (
        <svg
          fill="none"
          height="12"
          viewBox="0 0 12 12"
          width="12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="m6.03927.165405c-3.27055 0-5.922909 2.652005-5.922909 5.923645 0 2.61709 1.697089 4.83705 4.050909 5.62035.29636.0546.40436-.1284.40436-.2854 0-.1408-.00509-.5131-.008-1.0073-1.64763.3578-1.99527-.7942-1.99527-.7942-.26946-.68436-.65782-.86654-.65782-.86654-.53782-.36727.04073-.36001.04073-.36001.59454.04182.90727.61055.90727.61055.52836.90509 1.38655.64364 1.724.492.05382-.38254.20691-.64363.376-.79163-1.31527-.14946-2.69818-.65782-2.69818-2.92764 0-.64654.23091-1.17564.60982-1.58946-.06109-.14981-.26437-.75236.05818-1.56763 0 0 .49709-.15927 1.62872.60727.47237-.13163.97928-.19709 1.48291-.19964.50328.00255 1.00982.06801 1.48291.19964 1.13091-.76654 1.62727-.60727 1.62727-.60727.32328.81527.12001 1.41782.05928 1.56763.37964.41382.60873.94292.60873 1.58946 0 2.27564-1.38509 2.77636-2.70437 2.92291.21237.18291.40182.54436.40182 1.09672 0 .79204-.00727 1.43094-.00727 1.62514 0 .1585.10691.3429.40727.2851 2.35197-.7851 4.04767-3.00369 4.04767-5.62005 0-3.27164-2.6524-5.923645-5.92403-5.923645z"
            fill="#ffffff"
            fillRule="evenodd"
          />
        </svg>
      )
    case "https://twitter.com/thelflang":
      return (
        <svg
          fill="none"
          height="10"
          viewBox="0 0 13 10"
          width="13"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m4.58519 10c4.62962 0 7.16291-3.83919 7.16291-7.16289 0-.10801 0-.21602-.0049-.32403.4909-.35348.918-.80024 1.2568-1.30591-.4517.20128-.9377.33384-1.4483.39766.5204-.30929.9181-.805148 1.1095-1.394284-.486.289658-1.026.495856-1.6004.608773-.4615-.490946-1.11448-.7953322-1.83617-.7953322-1.38938 0-2.51856 1.1291732-2.51856 2.5185532 0 .19638.02455.38785.06383.57441-2.09143-.1031-3.94721-1.10954-5.1893-2.631474-.21602.373119-.33876.805154-.33876 1.266644 0 .87388.44677 1.64467 1.11936 2.09634-.41239-.01473-.80024-.12765-1.13899-.31421v.03437c0 1.21754.86897 2.23871 2.01778 2.46946-.2111.05891-.43203.08837-.66277.08837-.16202 0-.31912-.01473-.47131-.04419.31911 1.00153 1.25191 1.72813 2.35163 1.74777-.86406.67751-1.94906 1.08008-3.12733 1.08008-.20128 0-.402571-.00982-.59895-.03436 1.10954.70696 2.43509 1.12425 3.85393 1.12425z"
            fill="#ffffff"
          />
        </svg>
      )
      case "https://join.slack.com/t/lf-community/shared_invite/zt-1b4egenxd-Dz~uG5Ps6ce71pgJG02cjw":
        return (
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="-20 -3 54 54" 
            >
              <path d="M13,23.17a2.52,2.52,0,1,1-2.52-2.53H13Zm1.27,6.31a2.53,2.53,0,0,0,5,0V23.17a2.53,2.53,0,1,0-5,0Zm5-16.44V10.52A2.53,2.53,0,1,0,16.83,13Zm-8.84,1.27a2.53,2.53,0,0,0,0,5h6.31a2.53,2.53,0,1,0,0-5Zm16.44,5h2.52A2.53,2.53,0,1,0,27,16.83Zm-1.27-8.84a2.53,2.53,0,0,0-5.05,0v6.31a2.53,2.53,0,1,0,5.05,0ZM20.64,27v2.52A2.53,2.53,0,1,0,23.17,27Zm8.84-1.27a2.53,2.53,0,0,0,0-5.05H23.17a2.53,2.53,0,1,0,0,5.05Z" fill="#ffffff" className="color000 svgShape"></path>
            </svg>
        )
  }
}

export const SiteFooter = (props: Props) => {
  const normalLinks = useLinguaFrancaLinks.filter(
    l => !l.url.includes("#show-examples")
  )

  const Link = createIntlLink(props.lang)

  const hideDocs = props.suppressDocRecommendations
  return (
    <footer id="site-footer" role="contentinfo">
      {props.suppressCustomization ? null : <Customize />}

      <section id="community">
        <article id="logos">
          
        <a href="">
            <img
              id="lf-logo"
              width={195}
              height={75}
              src={require("../../../../../img/footer_logo.svg").default}
              alt="Lingua Franca Logo"
            />
          </a>
          <p>Made with &#9829; in Berkeley, Dallas, Dresden, Kiel, and Seoul
          </p>
          <p>
            © 2019-{new Date().getFullYear()} The Lingua Franca Team
            <br />
          </p>
        </article>

        <article id="using-lf">
          <h3>Using Lingua Franca</h3>
          <ul>
            {normalLinks.map(page => (
              <li key={page.url}>
                <Link to={page.url}>{page.title}</Link>
              </li>
            ))}
          </ul>
        </article>

        <article id="community-links">
          <h3>Community</h3>
          <ul>
            {communityLinks.map(page => {
              const favicon = faviconForURL(page.url)
              const favSpan = favicon ? (<span className="link-prefix">{favicon}</span>) : null
              return (
                <li key={page.url}>
                  <a style={{ position: "relative" }} href={page.url}>
                    {favSpan}
                    {page.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </article>
      </section>

    </footer >
  )
}
