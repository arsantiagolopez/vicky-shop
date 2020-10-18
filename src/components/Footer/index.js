import { graphql, useStaticQuery } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react'

const Footer = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            personalInfo {
              phone
            }
          }
        }
      }
    `,
  )

  const phone = get(data, 'site.siteMetadata.personalInfo.phone')

  const whatsappNumber = phone

  const formatPhone = num => {
    num = num.toString()
    // if less than 10 numbers, return unformatted
    if (num.length < 10) {
      return num
    }
    // if only 10 numbers, local
    else if (num.length === 10) {
      let match = num.match(/^(\d{3})(\d{3})(\d{4})$/)
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    // else, international number, last 10 are actual number
    else {
      const lastFour = num.substring(num.length - 4, num.length)
      const middleThree = num.substring(num.length - 7, num.length - 4)
      const firstThree = num.substring(num.length - 10, num.length - 7)
      const extension = num.substring(0, num.length - 10)

      return `${extension} (${firstThree}) ${middleThree}-${lastFour}`
    }
  }

  return (
    <footer>
      <Divider style={{marginTop: `0`}} />
      <Container text style={{padding: `2em 0`}}>
        <Grid stackable textAlign="center">
          <Grid.Row>
            <Header as="h1">V I C K Y S H O P</Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column
              style={{
                fontStyle: `italic`,
                letterSpacing: `-0.5pt`,
              }}
            >
              <h3
                style={{
                  fontFamily: `Times New Roman`,
                  fontWeight: `normal`,
                  fontSize: `16pt`,
                }}
              >
                Martes a Domingo
              </h3>
              <p style={{marginTop: `-1em`}}>9:00AM - 10:00PM</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                style={{color: `#387b9f`}}
              >
                <Icon name="whatsapp" size="large" />
                {formatPhone(phone)}
              </a>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <p style={{fontSize: `10pt`, letterSpacing: `-0.25pt`}}>
              <i style={{fontFamily: `Times New Roman`}}>
                © Roy's Ale {new Date().getFullYear()}
              </i>{' '}
              – <b style={{fontSize: `8pt`}}>DESIGN BY ALEXANDER SANTIAGO</b>
            </p>
          </Grid.Row>
        </Grid>
      </Container>
    </footer>
  )
}

export default Footer
