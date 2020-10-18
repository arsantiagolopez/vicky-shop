import {Link} from 'gatsby'
import Img from 'gatsby-image'
import React, {useContext} from 'react'
import {Card, Container, Image, Label} from 'semantic-ui-react'
import SortContext from '../Context/SortContext'
import './index.css'

const ProductList = ({path, products}) => {
  const {sortChoice} = useContext(SortContext)

  // Filter products based on current category (path)
  const filteredProducts = []
  products.forEach(item => {
    // Replace path's dashes with spaces
    path = path.replace(/-/g, ' ')
    // path is all lowercase, so make item.category all lowercase
    if (item.category.toLowerCase() === path) {
      filteredProducts.push(item)
    }
  })

  // Sort filtered products based on choice (global context)
  const sortedProducts = filteredProducts.sort((a, b) => {
    // Sort by Recent
    if (sortChoice === 'Reciente') {
      const dateA = a.dateCreated
      const dateB = b.dateCreated
      return dateA < dateB ? -1 : dateA > dateB ? 1 : 0
    }
    // Else sort by Name (default)
    else {
      const textA = a.title.toUpperCase()
      const textB = b.title.toUpperCase()
      return textA < textB ? -1 : textA > textB ? 1 : 0
    }
  })

  return (
    <Container text style={{minWidth: `65vw`, paddingBottom: `2em`}}>
      {/* Display product cards */}
      <Card.Group
        items={mapProductsToItems(sortedProducts)}
        itemsPerRow={3}
        stackable
        style={{
          padding: `1em 0`,
          textTransform: `capitalize`,
        }}
        centered
      />
    </Container>
  )
}

const mapProductsToItems = products =>
  products.map(({title, category, featuredImage, dateCreated, slug}, key) => {
    /* If product is created within a week,
       display a "new" ribbon. */
    const week = new Date() - 1000 * 60 * 60 * 24 * 7
    const isDateCreated = new Date(dateCreated) * 1

    // Replace category's spaces with dashes & make lowercase
    const categorySlug = category.replace(/\s+/g, '-').toLowerCase()

    // Go to unique product page
    const titleDateSlug = slug + `${Date.parse(dateCreated)}`
    return {
      as: Link,
      to: `/catalogo/${categorySlug + titleDateSlug}`,
      key: key,
      image: (
        <Image>
          {isDateCreated > week ? (
            <Label as="div" color="red" ribbon style={{zIndex: `2`}}>
              NEW
            </Label>
          ) : null}
          <Img
            fluid={{...featuredImage.childImageSharp.fluid, aspectRatio: 1}}
            alt={title + key}
          />
        </Image>
      ),
      header: title,
    }
  })

export default ProductList
