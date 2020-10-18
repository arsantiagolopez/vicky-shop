import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import get from "lodash/get"
import Layout from "../components/Layout"
import SEO from '../components/SEO'
import Landing from "../components/Landing"

import 'semantic-ui-css/semantic.min.css'

const StoreIndex = ({ location }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  const siteTitle = get(data, "site.siteMetadata.title")

  return (
    <Layout location={location}>
      <SEO title={siteTitle} />
      <Landing />
    </Layout>
  )
}

export default StoreIndex
