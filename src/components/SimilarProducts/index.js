import {Link} from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import {Card, Header, Image, Segment} from 'semantic-ui-react'
import './index.css'

const SimilarProducts = ({currentProduct, brand, brandProducts}) => {
  const products = brandProducts

  // Take out current product to not show it on Similar Products
  const filteredProducts = products.filter(
    item => item.node.frontmatter.title !== currentProduct,
  )

  return (
    <>
      <Header
        size="large"
        style={{textTransform: `capitalize`, marginBottom: `0`}}
      >
        Mas Productos {brand}
      </Header>
      <div className="similarSection">
        <Segment basic>
          {filteredProducts.map((item, key) => {
            const product = item.node.frontmatter
            // Replace category's spaces with dashes & make lowercase
            const categorySlug = product.category
              .replace(/\s+/g, '-')
              .toLowerCase()

            const titleDateSlug =
              item.node.fields.slug + `${Date.parse(product.dateCreated)}`
            return (
              <Card
                as={Link}
                to={`/catalogo/${categorySlug + titleDateSlug}`}
                key={key}
                style={{
                  display: `inline-block`,
                  width: `40vh`,
                  height: `40vh`,
                  margin: `0 1rem 0 0`,
                }}
                className="similarProduct"
              >
                <Image>
                  <Img
                    fluid={{
                      ...product.featuredImage.childImageSharp.fluid,
                      aspectRatio: 1,
                    }}
                    alt={product.title}
                  />
                </Image>
              </Card>
            )
          })}
        </Segment>
      </div>
    </>
  )
}

export default SimilarProducts
