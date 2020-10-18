import {graphql, useStaticQuery} from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import CategoryList from '../components/CategoryList'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

const StoreMenu = ({location}) => {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                categoryName
                featuredImage {
                  childImageSharp {
                    fluid(maxWidth: 700) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  )

  const categories = get(data, 'allMarkdownRemark.edges')

  // if name field is not null, node is a category
  const filteredCategories = categories.filter(
    item => item.node.frontmatter.categoryName !== null,
  )
  const sortedCategories = filteredCategories.sort((a, b) =>
    a.node.frontmatter.categoryName > b.node.frontmatter.categoryName ? 1 : -1,
  )

  return (
    <Layout location={location}>
      <SEO title="Menu" />
      <CategoryList categories={sortedCategories} />
    </Layout>
  )
}

export default StoreMenu
