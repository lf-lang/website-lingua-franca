import React, { MouseEventHandler, useEffect } from "react"
import { Link } from "gatsby"

import "./Sidebar.scss"
import { onAnchorKeyDown, onButtonKeydown } from "./Sidebar-keyboard"
import { SidebarNavItem } from "../../lib/documentationNavigation"
import { getTargetLanguage, setTargetLanguage } from "../../lib/setTargetLanguage"

export type Props = {
  navItems: SidebarNavItem[]
  selectedID: string
  openAllSectionsExceptWhatsNew?: true
}
const closedChevron = <svg fill="none" height="14" viewBox="0 0 9 14" width="9" xmlns="http://www.w3.org/2000/svg"><path d="m1 13 6-6-6-6" stroke="#000" strokeWidth="2" /></svg>
const openChevron = <svg fill="none" height="9" viewBox="0 0 14 9" width="14" xmlns="http://www.w3.org/2000/svg"><path d="m1 1 6 6 6-6" stroke="#000" strokeWidth="2" /></svg>

export const getTagFromParents = (tag: string, root: { nodeName: string, parentElement: any }) => {
  let parent = root.parentElement
  while (parent.nodeName !== tag.toUpperCase()) {
    parent = parent.parentElement
    if (parent.nodeName === "BODY") throw new Error("Could not find parent LI for toggle ")
  }
  return parent as HTMLElement
}

const toggleNavigationSection: MouseEventHandler = (event) => {
  const li = getTagFromParents("li", event.target as any)
  const isOpen = li.classList.contains("open")
  if (isOpen) {
    li.classList.remove("open")
    li.classList.add("closed")

  } else {
    li.classList.remove("closed")
    li.classList.add("open")
  }
}

export const SidebarToggleButton = () => {
  const toggleClick = () => {
    const navSidebar = document.getElementById("sidebar")
    const isOpen = navSidebar?.classList.contains("show")
    if (isOpen) {
      navSidebar?.classList.remove("show")
    } else {
      navSidebar?.classList.add("show")
    }
  }


  return (
    <button id="small-device-button-sidebar" onClick={toggleClick}>
      <svg fill="none" height="26" viewBox="0 0 26 26" width="26" xmlns="http://www.w3.org/2000/svg"><g fill="#fff"><path d="m0 1c0-.552285.447715-1 1-1h24c.5523 0 1 .447715 1 1v3h-26z" /><path d="m0 11h13 13v4h-26z" /><path d="m0 22h26v3c0 .5523-.4477 1-1 1h-24c-.552284 0-1-.4477-1-1z" /></g></svg>
    </button>
  )
}

export const Sidebar = (props: Props) => {
  useEffect(() => {
    // Keep all of the sidebar open at launch, then use JS to close the ones after
    // because otherwise you can't jump between sections
    document.querySelectorAll(".closed-at-launch").forEach(f => {
      f.classList.remove("closed-at-launch")
      f.classList.remove("open")
      f.classList.add("closed")
    })
  }, [])

  const RenderItem = (props: { item: SidebarNavItem, selectedID: string, openAllSectionsExceptWhatsNew?: boolean }) => {
    const item = props.item
    if (!item.items) {
      // Is it the leaf in the nav?
      const isSelected = item.id === props.selectedID
      const aria: any = {}
      if (isSelected) {
        aria["aria-current"] = "page"
        aria.className = "highlight"
      }

      const href = item.permalink!
      return <li key={item.id} {...aria}>
        <Link to={href} onKeyDown={onAnchorKeyDown}>{item.title}</Link>
      </li>
    } else {
      // Has children
      const findSelected = (item: SidebarNavItem) => {
        if (item.id === props.selectedID) return true
        if (!item.items) return false
        for (const subItem of item.items) {
          if (findSelected(subItem)) return true
        }
        return false
      }

      const hostsSelected = findSelected(item)
      const classes = [] as string[]

      const forceOpen = props.openAllSectionsExceptWhatsNew && item.id !== "whats-new"
      if (hostsSelected || forceOpen) {
        classes.push("open")
        classes.push("highlighted")
      } else {
        classes.push("closed")
      }

      const opened = { "aria-expanded": "true", "aria-label": item.title + " close" }
      const closed = { "aria-label": item.title + " expand" }
      const aria = hostsSelected ? opened : closed

      return (
        <li className={classes.join(" ")} key={item.id}>
          <button {...aria} onClick={toggleNavigationSection} onKeyDown={onButtonKeydown}>
            {item.title}
            <span key="open" className="open">{openChevron}</span>
            <span key="closed" className="closed">{closedChevron}</span>
          </button>
          <ul>
            {item.items.map(item => <RenderItem key={item.id} item={item} openAllSectionsExceptWhatsNew={props.openAllSectionsExceptWhatsNew} selectedID={props.selectedID} />)}
          </ul>
        </li>
      )
    }
  }

  const TargetLanguageLink = (props: {target: string, children: string}) => {
    return <a
      className={getTargetLanguage() === props.target ? "selected" : "unselected"}
      id={props.target}
      onClick={() => setTargetLanguage(props.target)}
    >
      {props.children}
    </a>
  }

  function toggleOpen() {
    const selector = document.getElementById("targetChooser");
    if (selector === null) return;
    selector.className = selector.className === "open" ? "closed" : "open";
  }

  /* Target language chooser */
  const RenderTargetChooser = () => {
    return (
      <li id="targetChooser" className="closed" onClick={toggleOpen}>
        <button id="targetSelector">
          <div className="language-lf-c current-target">C</div>
          <div className="language-lf-cpp current-target">C++</div>
          <div className="language-lf-py current-target">Python</div>
          <div className="language-lf-rs current-target">Rust</div>
          <div className="language-lf-ts current-target">TypeScript</div>
          <span className="open">
            <svg fill="none" height="9" viewBox="0 0 14 9" width="14" xmlns="http://www.w3.org/2000/svg">
              <path d="m1 1 6 6 6-6" stroke="#000" stroke-width="2"></path>
            </svg>
          </span>
          <span className="closed">
            <svg fill="none" height="14" viewBox="0 0 9 14" width="9" xmlns="http://www.w3.org/2000/svg">
              <path d="m1 13 6-6-6-6" stroke="#000" stroke-width="2"></path>
            </svg>
          </span>
        </button>
        <ul>
          <li><TargetLanguageLink target="lf-c">C</TargetLanguageLink></li>
          <li><TargetLanguageLink target="lf-cpp">C++</TargetLanguageLink></li>
          <li><TargetLanguageLink target="lf-py">Python</TargetLanguageLink></li>
          <li><TargetLanguageLink target="lf-ts">TypeScript</TargetLanguageLink></li>
          <li><TargetLanguageLink target="lf-rs">Rust</TargetLanguageLink></li>
        </ul>
      </li>
    )
  }

  return (
    <nav id="sidebar">
      <ul>
        <RenderTargetChooser/>
        {props.navItems.map(item => <RenderItem key={item.id} item={item} openAllSectionsExceptWhatsNew={props.openAllSectionsExceptWhatsNew} selectedID={props.selectedID} />)}
      </ul>
    </nav>
  )
}
