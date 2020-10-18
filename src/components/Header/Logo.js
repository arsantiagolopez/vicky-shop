import {graphql, useStaticQuery} from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import React from 'react'
import {Image} from 'semantic-ui-react'

const Logo = () => {
  const data = useStaticQuery(
    graphql`
      query {
        logoImage: file(relativePath: {eq: "logoNameFull.png"}) {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `,
  )

  const logoImage = get(data, `logoImage`)

  return (
    <Image size="small" style={{marginRight: '1.5em'}}>
      <Img fluid={logoImage.childImageSharp.fluid} alt="Vicky Shop" />
    </Image>
  )
}

export default Logo
