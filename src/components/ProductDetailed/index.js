import {Link} from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import {
  Breadcrumb,
  Container,
  Grid,
  Header,
  Icon,
  Label,
} from 'semantic-ui-react'
import AddToCart from '../AddToCart'
import SimilarProducts from '../SimilarProducts'
import './index.css'

const ProductDetailed = ({
  location,
  title,
  category,
  size,
  brand,
  colorInfo,
  description,
  image,
  phone,
  brandProducts,
}) => {
  // Replace spaces with dashes
  const categorySlug = category.replace(/\s+/g, '-').toLowerCase()

  const whatsappNumber = phone
  // const telegramUser = null

  const shareText = `Mira esto! ${location.href}`
  const urlEncodedShareText = shareText.replace(/\s+/g, '%20')
  const telegramShareText = `Mira esto!`

  const whatsappShareHref = `https://api.whatsapp.com/send?phone=&text=${urlEncodedShareText}&source=&data=`
  const telegramShareHref = `https://t.me/share/url?url=${location.href}&text=${telegramShareText}`

  return (
    <Container text style={{minWidth: `75vw`, margin: `1em 0 3em 0`}}>
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        size="massive"
        style={{textTransform: `capitalize`, margin: `0.5em 0`}}
      >
        <Breadcrumb.Section
          as={Link}
          to={`/catalogo/${categorySlug}/`}
          style={{color: `gray`}}
        >
          {category}
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="chevron right" />
        <Breadcrumb.Section active>{title}</Breadcrumb.Section>
      </Breadcrumb>
      <Grid columns="2" stackable style={{paddingTop: `1em`}}>
        {/* Left Image Section */}
        <Grid.Column>
          <Img
            alt={title}
            fluid={{
              ...image.childImageSharp.fluid,
              aspectRatio: 1,
            }}
          />
        </Grid.Column>
        {/* Right Content Section */}
        <Grid.Column>
          <Header className="productHeader" size="huge">
            {title}
          </Header>

          <Header
            size="small"
            style={{margin: `1rem 0`, textTransform: `capitalize`}}
          >
            {brand}
          </Header>

          <Header size="small">Tamaño</Header>
          <Label className="sizeLabel">{size}</Label>

          {/* Color Field */}

          {colorInfo !== null ? (
            <>
              <Header size="small">
                {colorInfo.length > 1 ? `Colores` : `Color`}
              </Header>
              {colorInfo.map((item, key) => (
                <Label className="colorLabel" key={key}>
                  <Icon
                    name="circle"
                    style={{
                      color: item.node.frontmatter.colorCode,
                      paddingRight: `5px`,
                    }}
                    fitted
                  />
                  {item.node.frontmatter.colorName}
                </Label>
              ))}
            </>
          ) : null}

          <Header size="small">Descripcion</Header>
          <p>{description}</p>

          {/* Add to Cart Button */}
          <AddToCart location={location} number={whatsappNumber} />

          <Header size="small">Compartir</Header>

          <Label as="a" href={whatsappShareHref} size="large" color="green">
            <Icon name="whatsapp" />
            Whatsapp
          </Label>
          <Label as="a" href={telegramShareHref} size="large" color="blue">
            <Icon name="telegram" />
            Telegram
          </Label>
        </Grid.Column>
      </Grid>
      {/* Bottom Similar Products Section */}
      {/* Show if more than 1 product of same brand */}
      {brandProducts.length > 1 ? (
        <SimilarProducts
          currentProduct={title}
          brand={brand}
          brandProducts={brandProducts}
        />
      ) : null}
    </Container>
  )
}

export default ProductDetailed
