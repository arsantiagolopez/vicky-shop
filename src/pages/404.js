import React from "react"
import { Link } from "gatsby"

import { Container, Grid, Header } from "semantic-ui-react"

import SEO from "../components/SEO"

const NotFoundPage = () => (
  <Container text style={{ margin: 0, padding: 0 }}>
    <SEO title="404: Pagina No Encontrada" />
    <Grid
      textAlign="center"
      style={{ height: `100vh`, alignItems: "center", alignContent: `center` }}
    >
      <Grid.Row>
        <Header as="h1">Creo que te has perdido.</Header>
      </Grid.Row>
      <Grid.Row>
        <i>Llegaste a una pagina que no existe... La tristeza.</i>
      </Grid.Row>
      <Grid.Row>
        <Link to="/">Regresa</Link>
      </Grid.Row>
    </Grid>
  </Container>
)

export default NotFoundPage
