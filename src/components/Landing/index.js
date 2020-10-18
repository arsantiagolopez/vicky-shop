import {graphql, Link, useStaticQuery} from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import React from 'react'
import {Button, Header, Icon} from 'semantic-ui-react'
import './index.css'

const Landing = () => {
  const data = useStaticQuery(
    graphql`
      query {
        nameImage: file(relativePath: {eq: "logoName.png"}) {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        desktopImage: file(relativePath: {eq: "desktopLanding.jpg"}) {
          childImageSharp {
            fluid(maxWidth: 5000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mobileImage: file(relativePath: {eq: "mobileLanding.jpg"}) {
          childImageSharp {
            fluid(maxWidth: 375) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `,
  )

  const nameImage = get(data, `nameImage`)
  const desktopImage = get(data, `desktopImage`)
  const mobileImage = get(data, `mobileImage`)

  return (
    <>
      <Header className="logoName">
        <Img fluid={nameImage.childImageSharp.fluid} alt="Vicky Shop Logo" />
      </Header>

      {/* Images will render based on media queries */}
      <div className="desktopImage">
        <Img
          fluid={desktopImage.childImageSharp.fluid}
          alt="Vicky Shop"
          style={{width: `100vw`, zIndex: `-10`}}
        />
      </div>
      <div className="mobileImage">
        <Img
          fluid={mobileImage.childImageSharp.fluid}
          alt="Vicky Shop"
          style={{height: `90vh`, zIndex: `-10`}}
        />
      </div>

      <div className="buttonDiv">
        <Button
          as={Link}
          to="/catalogo/"
          size="massive"
          animated="fade"
          className="orderButton"
        >
          <Button.Content visible>¡COMPRA YA!</Button.Content>
          <Button.Content hidden>
            <Icon name="arrow right" />
          </Button.Content>
        </Button>
      </div>
    </>
  )
}

export default Landing
