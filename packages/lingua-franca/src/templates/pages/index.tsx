import React, { useEffect } from "react"
import {withPrefix} from "gatsby"
import { Layout } from "../../components/layout"
import { Intl } from "../../components/Intl"

import { indexCopy } from "../../copy/en/index2"
import { createInternational } from "../../lib/createInternational"
import { useIntl } from "react-intl"

import "../pages/css/index.scss"
import "../pages/css/documentation.scss"

import { createIntlLink } from "../../components/IntlLink"
import { AboveTheFold } from "../../components/index/AboveTheFold"

const Section = (props: { children: any, color: string, className?: string }) =>
  <div key={props.color} className={props.color + " " + (props.className ?? "")}><div className="container">{props.children}</div></div>

const Row = (props: { children: any, className?: string, key?: string }) => <div key={props.key} className={[props.className, "row"].join(" ")}>{props.children}</div>
const Col = (props: { children: any, className?: string }) => <div className={[props.className, "col1"].join(" ")}>{props.children}</div>
const Col2 = (props: { children: any }) => <div className="col2">{props.children}</div>
const Half = (props: { children: any, className?: string }) => <div className={[props.className, "half"].join(" ")}>{props.children}</div>

type Props = {
  pageContext: any
}

const Index: React.FC<Props> = (props) => {
  const i = createInternational<typeof indexCopy>(useIntl())
  const Link = createIntlLink(props.pageContext.lang)

  /** Basically a <p> with bold set up */
  const P = (props: { ikey: keyof typeof indexCopy }) =>  <p key={props.ikey}>{i(props.ikey, { strong: (...chunk) => <strong>{chunk}</strong> })}</p>
  const GetStarted = (props: { href: string, title: any, subtitle: any, classes: string }) => (
    <Link to={props.href} className={"get-started " + props.classes} >
        <div> 
            <div className="fluid-button-title">{i(props.title)}</div>
            <div className="fluid-button-subtitle">{i(props.subtitle)}</div>
        </div>
        <div>
            <svg width="14" height="23" viewBox="0 0 14 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L11 11.5L2 21" stroke="black" strokeWidth="4"/>
            </svg>
        </div>
    </Link>
  )


  return (
    <Layout title="Lingua Franca" description="Lingua Franca augments existing languages with a coordination layer that provides deterministic reactive concurrency and makes it easy to express timed behaviors." lang={props.pageContext.lang} suppressCustomization suppressDocRecommendations>

      <div id="index-2">
        <Section color="blue" className="headline">
          <AboveTheFold />
        </Section>

        <Section color="white">
          <h2>{i("index_2_what_is")}</h2>
          <Row>
            <Col key='what is lf'>
              <h3>{i("index_2_what_is_lf")}</h3>
              <P ikey="index_2_what_is_lf_copy" />
            </Col>
            <Col key='you can trust lingua franca'>
              <h3>{i("index_2_trust")}</h3>
              <P ikey="index_2_trust_copy" />
            </Col>
            <Col key='test'>
              <h3>{i("index_2_scale")}</h3>
              <P ikey="index_2_scale_copy" /> 
            </Col>
          </Row>
        </Section>

        <Section color="light-grey" className="get-started-section">
            <h2 id='get_started'>{i("index_2_started_title")}</h2>
            <Row>
                <Col key='handbook'>
                    <GetStarted href="docs/handbook/overview" classes="tall handbook" title="index_2_started_handbook" subtitle="index_2_started_handbook_blurb" />
                </Col>
                <Col key='download'>
                    <GetStarted href="/download" classes="tall download" title="nav_download" subtitle="index_2_install" />
                </Col>
            </Row>
        </Section>

      </div>

    </Layout >)

}

export default (props: Props) => <Intl locale={props.pageContext.lang}><Index {...props} /></Intl>

// Recurses up to get the y pos of a node
// https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element-relative-to-the-browser-window
function getOffset( el ) {
  var _x = 0;
  var _y = 0;
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
  }
  return { top: _y, left: _x };
}


const updateOnScroll = (i: any) => () => {
  const adopt = document.getElementById("adopt-gradually-content") as HTMLDivElement
  if (!adopt) return

  const offset = getOffset(adopt).top
  const fromTop = window.scrollY
  const height =  adopt.scrollHeight
  
  const quarterHeight = (height - 200)/4 
  
  const startPoint = 100
  const y = fromTop - offset + startPoint

  const samples = adopt.getElementsByClassName("adopt-step")  as HTMLCollectionOf<HTMLDivElement>
  let index: 0 | 1| 2| 3 = 0
  if (y >= 0 && y < quarterHeight) index = 1
  else if (y >= (quarterHeight) && y < (quarterHeight * 2)) index = 2
  else if (y >= (quarterHeight * 2)) index =3
  samples.item(0)!.style.opacity = index === 0 ? "1" : "0"
  samples.item(1)!.style.opacity = index === 1 ? "1" : "0"
  samples.item(2)!.style.opacity = index === 2 ? "1" : "0"
  samples.item(3)!.style.opacity = index === 3 ? "1" : "0"
  
  const stepper = document.getElementById("global-stepper") as HTMLDivElement
  stepper.children.item(0)!.classList.toggle("active", index === 0)
  stepper.children.item(1)!.classList.toggle("active", index === 1)
  stepper.children.item(2)!.classList.toggle("active", index === 2)
  stepper.children.item(3)!.classList.toggle("active", index === 3)

}