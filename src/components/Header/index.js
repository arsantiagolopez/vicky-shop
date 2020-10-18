import {Link, withPrefix} from 'gatsby'
import React, {useEffect, useState} from 'react'
import {Container, Menu} from 'semantic-ui-react'
import SortBy from '../SortBy'
import './index.css'
import Logo from './Logo'

const Header = ({path}) => {
  const [activeItem, setActiveItem] = useState(path)

  useEffect(() => {
    setActiveItem(path)
  }, [path])

  return (
    <Menu
      size="huge"
      borderless
      style={{
        textAlign: `center`,
        height: `100%`,
      }}
    >
      <Container text>
        <Menu.Item
          active={activeItem === withPrefix('/')}
          as={Link}
          to="/"
          header
          style={{fontWeight: `bold`}}
        >
          <Logo />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/catalogo/"
            active={activeItem === withPrefix('/catalogo/')}
          >
            Catalogo
          </Menu.Item>
          <Menu.Item style={{pointer: `cursor`}}>
            <SortBy />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default Header
