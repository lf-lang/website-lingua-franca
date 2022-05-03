import React, { useEffect, useState } from "react"

import { indexCopy } from "../../copy/en/index2"
import { createInternational } from "../../lib/createInternational"
import { useIntl } from "react-intl"

const Row = (props: { children: any, className?: string }) => <div className={[props.className, "row"].join(" ")}>{props.children}</div>
const Col = (props: { children: any, className?: string }) => <div className={[props.className, "col1"].join(" ")}>{props.children}</div>
const Col2 = (props: { children: any }) => <div className="col2">{props.children}</div>

const event = (name: string, options?: any) => {
  // @ts-ignore
  window.appInsights &&
    // @ts-ignore
    window.appInsights.trackEvent({ name }, options)
}

const FluidButton = (props: { href?: string, onClick?: any, title: string, subtitle?: string, icon: JSX.Element, className?: string }) => (
  <a className={"fluid-button " + props.className || ""} href={props.href} onClick={props.onClick}>
    <div>
      <div className="fluid-button-title">{props.title}</div>
      <div className="fluid-button-subtitle">{props.subtitle}</div>
    </div>
  </a>
)

export const AboveTheFold = () => {
  const [showCTALinks, setShowCTALinks] = useState(false)
  const i = createInternational<typeof indexCopy>(useIntl())

  const Headline = () => {
    const onclick = (e) => {
      setShowCTALinks(false)
      e.preventDefault()
      event("Home Page CTA Started")
      return false
    }

    return (<Row>
      <Col>
        <h1>{i("index_2_headline", { bold: (...chunk) => <strong>{chunk}</strong> })}</h1>
        <p>{i("index_2_summary")}</p>
        <p>{i("index_2_detail")}</p>

        <div className="call-to-action" style={{ justifyContent: "left" }}>
          <FluidButton
            title={i("index_2_cta_install")}
            subtitle={i("index_2_cta_install_subtitle")}
            href="/download"
            icon={
              <svg width="21" height="5" viewBox="0 0 21 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="4" height="4" stroke="black" />
                <rect x="8.5" y="0.5" width="4" height="4" stroke="black" />
                <rect x="16.5" y="0.5" width="4" height="4" stroke="black" />
              </svg>
            } />
        </div>
      </Col>
    </Row>)
  }

  const CTAHeadlines = () => (
    <div className="cta-redirects">
      <h2>Get Started With Lingua Franca</h2>
      <Row>
        <Col className="call-to-action hide-small">
          <img src={require("./img/Lingua_Franca.png").default} width="100%"  />
          <FluidButton
            title={i("index_2_cta_download")}
            subtitle={i("index_2_cta_download_subtitle")}
            href="/download"
            onClick={() => event("Home Page CTA Exited", { link: "download" })}
            icon={
              <svg width="15" height="27" viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 0.5V19M7.5 19L1 13M7.5 19L13 13" stroke="black" strokeWidth="1.5" />
                <path d="M0.5 25H14.5" stroke="black" strokeWidth="4" />
              </svg>
            } />
        </Col>
      </Row>
    </div>
  )

  const CTAHeadlineMobile = () => (
    <div>
      <h2>Get Started<br />With Lingua Franca</h2>
      <Row>
        <Col className="call-to-action flex-column">
          <div className="handbook-preview">
            <img src={require("../../assets/index/handbook.jpg").default} width={"100%"} />
          </div>
          <div className="inline-buttons">
            <a className='flat-button' href="/docs/handbook/intro.html">Web</a>
            <a className='flat-button' href="/assets/lingua-franca-handbook.epub">Epub</a>
            <a className='flat-button' href="/assets/lingua-franca-handbook.pdf">PDF</a>
          </div>
        </Col>
      </Row>
    </div>
  )

  const CTALinks = () => {
    const Content = window.innerWidth < 600 ? CTAHeadlineMobile : CTAHeadlines
    return (
      <div className="cta">
        <a className="transparent-button" onClick={() => setShowCTALinks(false)}  href="#">
          <svg width="21" height="14" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.25 7.75L1.75 7.75M1.75 7.75L7.75 1.25M1.75 7.75L7.75 13.25" stroke="white" strokeWidth="2" />
          </svg>
          Back</a>
        <Content />
      </div>
    )
  }

  return !showCTALinks ? <Headline /> : <CTALinks />
}
