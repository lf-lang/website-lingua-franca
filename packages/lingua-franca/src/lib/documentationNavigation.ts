/* This function is completely auto-generated via the `yarn bootstrap` phase of
   the app. You can re-run it when adding new localized handbook pages by running:

   yarn workspace documentation create-handbook-nav

   Find the source of truth at packages/documentation/scripts/generateDocsNavigationPerLanguage.js
*/

export interface SidebarNavItem {
  title: string;
  id: string;
  permalink?: string;
  chronological?: boolean;
  oneline?: string;
  items?: SidebarNavItem[];
}

/** ---INSERT--- */

export function getDocumentationNavForLanguage(
  langRequest: string
): SidebarNavItem[] {
  const langs = ["en"];
  const lang = langs.includes(langRequest) ? langRequest : "en";
  const navigations: Record<string, SidebarNavItem[]> = {};

  navigations.en = [
    {
      title: "Resources",
      oneline: "Overview of the project.",
      id: "resources",
      chronological: true,

      items: [
        {
          title: "Overview",
          id: "0-overview",
          permalink: "/docs/handbook/overview",
          oneline: "Overview of Lingua Franca.",
        },
        {
          title: "Tutorial Video",
          id: "0-tutorial-video",
          permalink: "/docs/handbook/tutorial-video",
          oneline: "Tutorial video presented by the Lingua Franca team.",
        },
      ],
    },
    {
      title: "Writing Reactors",
      oneline: "Introduction to writing reactors:",
      id: "writing-reactors",
      chronological: true,

      items: [
        {
          title: "A First Reactor",
          id: "1-a-first-reactor",
          permalink: "/docs/handbook/a-first-reactor",
          oneline: "Writing your first Lingua Franca reactor.",
        },
        {
          title: "Inputs and Outputs",
          id: "1-inputs-and-outputs",
          permalink: "/docs/handbook/inputs-and-outputs",
          oneline: "Inputs, outputs, and reactions in Lingua Franca.",
        },
        {
          title: "Parameters and State Variables",
          id: "1-parameters-and-state-variables",
          permalink: "/docs/handbook/parameters-and-state-variables",
          oneline: "Parameters and state variables in Lingua Franca.",
        },
        {
          title: "Time and Timers",
          id: "1-time-and-timers",
          permalink: "/docs/handbook/time-and-timers",
          oneline: "Time and timers in Lingua Franca.",
        },
        {
          title: "Composing Reactors",
          id: "1-composing-reactors",
          permalink: "/docs/handbook/composing-reactors",
          oneline: "Composing reactors in Lingua Franca.",
        },
        {
          title: "Reactions and Methods",
          id: "1-reactions-and-methods",
          permalink: "/docs/handbook/reactions-and-methods",
          oneline: "Reactions and methods in Lingua Franca.",
        },
        {
          title: "Causality Loops",
          id: "1-causality-loops",
          permalink: "/docs/handbook/causality-loops",
          oneline: "Causality loops in Lingua Franca.",
        },
        {
          title: "Extending Reactors",
          id: "1-extending-reactors",
          permalink: "/docs/handbook/extending-reactors",
          oneline: "Extending reactors in Lingua Franca.",
        },
        {
          title: "Actions",
          id: "1-actions",
          permalink: "/docs/handbook/actions",
          oneline: "Actions in Lingua Franca.",
        },
        {
          title: "Superdense Time",
          id: "1-superdense-time",
          permalink: "/docs/handbook/superdense-time",
          oneline: "Superdense time in Lingua Franca.",
        },
        {
          title: "Modal Reactors",
          id: "1-modal-reactors",
          permalink: "/docs/handbook/modal-models",
          oneline: "Modal Reactors",
        },
        {
          title: "Deadlines",
          id: "1-deadlines",
          permalink: "/docs/handbook/deadlines",
          oneline: "Deadlines in Lingua Franca.",
        },
        {
          title: "Multiports and Banks",
          id: "1-multiports-and-banks",
          permalink: "/docs/handbook/multiports-and-banks",
          oneline: "Multiports and Banks of Reactors.",
        },
        {
          title: "Preambles",
          id: "1-preambles",
          permalink: "/docs/handbook/preambles",
          oneline: "Defining preambles in Lingua Franca.",
        },
        {
          title: "Distributed Execution",
          id: "1-distributed-execution",
          permalink: "/docs/handbook/distributed-execution",
          oneline: "Distributed Execution (preliminary)",
        },
        {
          title: "Termination",
          id: "1-termination",
          permalink: "/docs/handbook/termination",
          oneline: "Terminating a Lingua Franca execution.",
        },
      ],
    },
    {
      title: "Tools",
      oneline: "Tools for developing Lingua Franca programs.",
      id: "tools",
      chronological: true,

      items: [
        {
          title: "Code Extension",
          id: "2-code-extension",
          permalink: "/docs/handbook/code-extension",
          oneline: "Visual Studio Code Extension for Lingua Franca.",
        },
        {
          title: "Epoch IDE",
          id: "2-epoch-ide",
          permalink: "/docs/handbook/epoch-ide",
          oneline: "Epoch IDE for Lingua Franca.",
        },
        {
          title: "Command Line Tools",
          id: "2-command-line-tools",
          permalink: "/docs/handbook/command-line-tools",
          oneline: "Command-line tools for Lingua Franca.",
        },
        {
          title: "Troubleshooting",
          id: "2-troubleshooting",
          permalink: "/docs/handbook/troubleshooting",
          oneline: "Troubleshooting page for Lingua Franca tools.",
        },
      ],
    },
    {
      title: "Reference",
      oneline: "Reference documentation.",
      id: "reference",
      chronological: true,

      items: [
        {
          title: "Expressions",
          id: "3-expressions",
          permalink: "/docs/handbook/expressions",
          oneline: "Expressions in Lingua Franca.",
        },
        {
          title: "Target Language Details",
          id: "3-target-language-details",
          permalink: "/docs/handbook/target-language-details",
          oneline: "Detailed reference for each target langauge.",
        },
        {
          title: "Target Declaration",
          id: "3-target-declaration",
          permalink: "/docs/handbook/target-declaration",
          oneline:
            "The target declaration and its parameters in Lingua Franca.",
        },
        {
          title: "Tracing",
          id: "3-tracing",
          permalink: "/docs/handbook/tracing",
          oneline: "Tracing (preliminary)",
        },
        {
          title: "Containerized Execution",
          id: "3-containerized-execution",
          permalink: "/docs/handbook/containerized-execution",
          oneline: "Containerized Execution using Docker",
        },
      ],
    },
    {
      title: "Developer",
      oneline:
        "Information for developers of the Lingua Franca language and tools.",
      id: "developer",
      chronological: true,

      items: [
        {
          title: "Regression Tests",
          id: "4-regression-tests",
          permalink: "/docs/handbook/regression-tests",
          oneline: "Regression Tests for Lingua Franca.",
        },
        {
          title: "Contributing",
          id: "4-contributing",
          permalink: "/docs/handbook/contributing",
          oneline: "Contribute to Lingua Franca.",
        },
        {
          title: "Downloading",
          id: "4-downloading",
          permalink: "/docs/handbook/download",
          oneline: "Quick start with Lingua Franca.",
        },
        {
          title: "Developer Eclipse Setup",
          id: "4-developer-eclipse-setup",
          permalink: "/docs/handbook/eclipse-oomph",
          oneline: "Developer Eclipse setup with Oomph.",
        },
        {
          title: "Developer IntelliJ Setup (for Kotlin)",
          id: "4-developer-intellij-setup-(for-kotlin)",
          permalink: "/docs/handbook/intellij-kotlin",
          oneline: "Developer IntelliJ Setup (for Kotlin).",
        },
        {
          title: "ROS Migration Guide",
          id: "4-ros-migration-guide",
          permalink: "/docs/handbook/ros-migration-guide",
          oneline: "ROS Migration Guide.",
        },
        {
          title: "Running Benchmarks",
          id: "4-running-benchmarks",
          permalink: "/docs/handbook/running-benchmarks",
          oneline: "Running Benchmarks.",
        },
      ],
    },
  ];

  return navigations[lang];
}

/** ---INSERT-END--- */

const findInNav = (
  item: SidebarNavItem | SidebarNavItem[],
  fun: (item: SidebarNavItem) => boolean
): SidebarNavItem | undefined => {
  if (Array.isArray(item)) {
    for (const subItem of item) {
      const sub = findInNav(subItem, fun);
      if (sub) return sub;
    }
  } else {
    if (fun(item)) return item;
    if (!item.items) return undefined;
    for (const subItem of item.items) {
      const sub = findInNav(subItem, fun);
      if (sub) return sub;
    }
    return undefined;
  }
};

export function getNextPageID(navs: SidebarNavItem[], currentID: string) {
  // prettier-ignore
  const section = findInNav(navs, (i) => i && !!i.items && !!i.items.find(i => i.id === currentID)) || false
  if (!section) return undefined;
  if (!section.chronological) return undefined;
  if (!section.items) return;

  const currentIndex = section.items.findIndex((i) => i.id === currentID);
  const next = section.items[currentIndex + 1];
  if (next) {
    if (next.items) {
      return {
        path: next.items[0].permalink,
        ...section.items[currentIndex + 1],
      };
    } else {
      return {
        path: next.permalink,
        ...section.items[currentIndex + 1],
      };
    }
  }
}

export function getPreviousPageID(navs: SidebarNavItem[], currentID: string) {
  // prettier-ignore
  const section = findInNav(navs, (i) => i && !!i.items && !!i.items.find(i => i.id === currentID)) || false

  if (!section) return undefined;
  if (!section.chronological) return undefined;
  if (!section.items) return;

  const currentIndex = section.items.findIndex((i) => i.id === currentID);
  const prev = section.items[currentIndex - 1];

  if (prev) {
    return {
      path: prev.permalink,
      ...section.items[currentIndex - 1],
    };
  }
}
