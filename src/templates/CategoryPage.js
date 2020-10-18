import {graphql, useStaticQuery} from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import Layout from '../components/Layout'
import Navigation from '../components/Navigation'
import ProductList from '../components/ProductList'
import SEO from '../components/SEO'

const CategoryPageTemplate = ({location: {pathname}}) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                categoryName
                category
                title
                description
                size
                brand
                featuredImage {
                  childImageSharp {
                    fluid(maxWidth: 700) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                dateCreated
              }
            }
          }
        }
      }
    `,
  )

  const siteTitle = get(data, 'site.siteMetadata.title')
  const products = get(data, 'allMarkdownRemark.edges')

  // If name field is not null, node is a category
  const categories = products.filter(
    item => item.node.frontmatter.categoryName !== null,
  )
  // Sort products address by category name
  const sortedCategories = categories.sort((a, b) =>
    a.node.frontmatter.categoryName > b.node.frontmatter.categoryName ? 1 : -1,
  )

  // Get product nodes
  // If category field is not null, node is a product
  const filteredProducts = products.filter(
    item => item.node.frontmatter.category !== null,
  )

  // Strip products array to only info needed
  const productsInfo = []
  filteredProducts.forEach(item => {
    const product = item.node.frontmatter
    productsInfo.push({
      category: product.category || null,
      title: product.title || null,
      featuredImage: product.featuredImage || null,
      dateCreated: product.dateCreated || null,
      slug: item.node.fields.slug || null,
    })
  })

  // Strip "/menu/" and "/" slashes off pathname
  const path = pathname.replace(/\/catalogo\/|\//g, '')

  return (
    <Layout path={path}>
      <SEO title={siteTitle} />
      <Navigation path={path} categories={sortedCategories} />
      <ProductList path={path} products={productsInfo} />
    </Layout>
  )
}

export default CategoryPageTemplate
