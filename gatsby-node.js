const {createFilePath} = require(`gatsby-source-filesystem`)
const path = require('path')

/* Runs everytime a node is created or updated
   Creates a "slug" field per node. */
exports.onCreateNode = ({node, getNode, actions}) => {
  const {createNodeField} = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({node, getNode, basePath: `pages`})
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// Creates a page for every product given its slug field
exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              category
              colorName
              title
              brand
              dateCreated
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({node}) => {
    const category = node.frontmatter.category
    const colorName = node.frontmatter.colorName

    if (category !== null && colorName === null) {
      // Node is a Product
      // Unique dateCreated string added to products url
      const titleDateSlug =
        node.fields.slug + `${Date.parse(node.frontmatter.dateCreated)}`
      // Replace spaces with dashes
      const categorySlug = category.replace(/\s+/g, '-').toLowerCase()
      createPage({
        path: `/catalogo/${categorySlug + titleDateSlug}`,
        component: path.resolve(`./src/templates/ProductPage.js`),
        context: {
          title: node.frontmatter.title,
          brand: node.frontmatter.brand,
        },
      })
    } else if (category === null && colorName === null) {
      // Node is a Category
      createPage({
        path: `/catalogo${node.fields.slug}`,
        component: path.resolve(`./src/templates/CategoryPage.js`),
      })
    }
  })
}
