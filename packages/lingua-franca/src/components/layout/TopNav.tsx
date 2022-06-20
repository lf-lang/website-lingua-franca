import React from "react"

import "./TopNav.scss"
import { useIntl } from "react-intl";
import { createIntlLink } from "../IntlLink";

export type Props = {
  lang: string
}

import { navCopy } from "../../copy/en/nav"
import { createInternational } from "../../lib/createInternational"

export const SiteNav = (props: Props) => {
  const i = createInternational<typeof navCopy>(useIntl())
  const IntlLink = createIntlLink(props.lang)
  // const loadDocSearch = () => {
  //   const isDev = document.location.host.includes('localhost')
  //   let customHandleSelected;

  //   if (isDev) {
  //     customHandleSelected = (input, event, suggestion, datasetNumber, context) => {
  //       const urlToOpen = suggestion.url.replace("www.lf-lang.org", "localhost:8000").replace("https", "http")
  //       window.open(urlToOpen)
  //     }
  //   }


  //   // @ts-ignore - this comes from the script above
  //   // docsearch({
  //   //   apiKey: '3c2db2aef0c7ff26e8911267474a9b2c',
  //   //   indexName: 'typescriptlang',
  //   //   inputSelector: '.search input',
  //   //   handleSelected: customHandleSelected,
  //   // });
  // }
  // This extra bit of mis-direction ensures that non-essential code runs after
  // the page is loaded
  // useEffect(() => {
  //   setupStickyNavigation()

  //   // @ts-ignore - this comes from the script above
  //   if (window.docsearch) {
  //     loadDocSearch();
  //   }
  //   if (document.getElementById("algolia-search")) return

  //   //const searchScript = document.createElement('script');
  //   //searchScript.id = "algolia-search"
  //   //const searchCSS = document.createElement('link');

  //   //searchScript.src = withPrefix("/js/docsearch.js");
  //  // searchScript.async = true;
  //   searchScript.onload = () => {
  //     // @ts-ignore - this comes from the script above
  //     if (window.docsearch) {
  //       loadDocSearch();

  //       searchCSS.rel = 'stylesheet';
  //       searchCSS.href = withPrefix('/css/docsearch.css');
  //       searchCSS.type = 'text/css';
  //       document.body.appendChild(searchCSS);

  //       document.getElementById("search-form")?.classList.add("search-enabled")
  //     }
  //   }

  //   document.body.appendChild(searchScript);
  // }, []);

  return (
    <header dir="ltr">
      <a className="skip-to-main" href="#site-content" tabIndex={0}>{i("skip_to_content")}</a>

      <div id="top-menu" className="up">
        <div className="left below-small">

          <IntlLink id="home-page-logo" to="/" aria-label="Lingua Franca Home Page">
            
          <img id="lf-logo" width={135} height={48} src={require("../../../../../img/header_logo.svg").default} alt="Lingua Franca Logo"/>
          </IntlLink>

          <nav role="navigation">
            <ul>
              <li className="nav-item hide-small"><IntlLink to="/download">{i("nav_download")}</IntlLink></li>
              <li className="nav-item"><IntlLink to="/docs/"><span>{i("nav_documentation_short")}</span></IntlLink></li>
              <li className="nav-item show-only-large"><IntlLink to="/docs/handbook/overview">{i("nav_handbook")}</IntlLink></li>
              <li className="nav-item"><IntlLink to="/community">{i("nav_community")}</IntlLink></li>
            </ul>
          </nav>

        </div>
      </div>

      <div id="site-content" />
    </header >
  )
}
