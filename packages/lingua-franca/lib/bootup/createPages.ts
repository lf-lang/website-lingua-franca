import { createDocumentationPages } from "./ingestion/createPagesForDocumentation"

import { GatsbyNode } from "gatsby"
import { createRootPagesLocalized } from "./ingestion/createRootPagesLocalized"

export const createPages: GatsbyNode["createPages"] = async args => {
  // Basically this function should be passing the right
  // functions down to other places to handle their own
  // creation of the pages

  await createDocumentationPages(args.graphql, args.actions.createPage)
  await createRootPagesLocalized(args.graphql, args.actions.createPage)
  
  return undefined
}
