import {Link} from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import Masonry from 'react-masonry-css'
import {Card, Container, Header, Image} from 'semantic-ui-react'
import './index.css'

const CategoryList = ({categories}) => {
  return (
    <Container text style={{margin: `1em 0`}}>
      <Masonry
        // meadia query breakpoints
        breakpointCols={{default: 3, 767: 2}}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {categories.map((item, key) => {
          const category = item.node.frontmatter.categoryName
          // Replace spaces with dashes
          const categorySlug = category.replace(/\s+/g, '-').toLowerCase()
          return (
            <Card as={Link} to={`/catalogo/${categorySlug}/`} key={key}>
              <Image>
                <Img
                  fluid={{
                    ...item.node.frontmatter.featuredImage.childImageSharp
                      .fluid,
                  }}
                />
              </Image>
              <Header size="huge" className="categoryLabel">
                {category}
              </Header>
            </Card>
          )
        })}
      </Masonry>
    </Container>
  )
}
export default CategoryList
