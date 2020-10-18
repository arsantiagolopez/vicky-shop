import {graphql} from 'gatsby'
import React from 'react'
import Layout from '../components/Layout'
import ProductDetailed from '../components/ProductDetailed'
import SEO from '../components/SEO'

const ProductPageTemplate = ({location, data}) => {
  const productData = data.singleProduct.frontmatter
  const brandProducts = data.brandProducts.edges
  const phone = data.sitePhone.siteMetadata.personalInfo.phone
  const colorObj = data.productColors.edges

  // Create color object with name and code
  const productColors = productData.colors

  let colorInfo = null
  if (productColors) {
    colorInfo = colorObj.filter(item =>
      productColors.includes(item.node.frontmatter.colorName),
    )
  }

  /* Product object serves as a "props" object.
     Keys and values are passed down as props */
  const product = {
    location: location,
    title: productData.title,
    category: productData.category,
    size: productData.size,
    brand: productData.brand,
    description: productData.description,
    image: productData.featuredImage,
    dateCreated: productData.dateCreated,
    colorInfo: colorInfo,
  }

  // Path is the current category
  const path = productData.category

  return (
    <Layout path={path}>
      <SEO title={product.title} />
      <ProductDetailed
        {...product}
        brandProducts={brandProducts}
        phone={phone}
      />
    </Layout>
  )
}

// Dynamic queries using context from gatsby-node.js
export const query = graphql`
  query ProductQuery($title: String!, $brand: String!) {
    sitePhone: site {
      siteMetadata {
        personalInfo {
          phone
        }
      }
    }
    singleProduct: markdownRemark(frontmatter: {title: {eq: $title}}) {
      frontmatter {
        title
        category
        size
        brand
        colors
        description
        dateCreated
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    brandProducts: allMarkdownRemark(
      filter: {frontmatter: {brand: {eq: $brand}}}
      sort: {order: ASC, fields: frontmatter___dateCreated}
      limit: 8
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            category
            dateCreated
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    productColors: allMarkdownRemark(
      filter: {frontmatter: {colorName: {ne: null}}}
    ) {
      edges {
        node {
          frontmatter {
            colorName
            colorCode
          }
        }
      }
    }
  }
`

export default ProductPageTemplate
