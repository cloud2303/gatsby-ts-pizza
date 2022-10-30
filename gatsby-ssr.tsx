import * as React from "react"
import type { GatsbySSR } from "gatsby"
import Layout from "./src/components/layout"
export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({ element, props }) => {
  console.log(props)
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout >{element}</Layout>
}