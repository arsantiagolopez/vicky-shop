import {Link} from 'gatsby'
import React, {useEffect, useState} from 'react'
import {Container, Menu} from 'semantic-ui-react'
import './index.css'

const Navigation = ({path, categories}) => {
  const [activeItem, setActiveItem] = useState(path)

  useEffect(() => {
    // center activeItem on click
    const activeElement = document.querySelector('.active')
    centerActive(activeElement)
  }, [activeItem])

  /* Navigation effect to make active menu
     items always centered.  */
  const centerActive = activeElement => {
    // get coordinates of active node
    const tabRect = activeElement.getBoundingClientRect()
    const scrollContainer = document.getElementById('navContainer')
    // centering logic
    const tabLeft = tabRect.left
    const halfTabWidth = tabRect.width / 2
    const screenWidth = window.innerWidth
    const diff = tabLeft + halfTabWidth - screenWidth / 2
    // scroll
    scrollContainer.scrollLeft += diff
  }

  const handleClick = (e, {name}) => {
    setActiveItem(name)
  }

  return (
    <Container textAlign="center">
      <div
        id="navContainer"
        style={{
          overflow: `hidden`,
          overflowX: `scroll`,
        }}
      >
        <Menu fluid text>
          {categories.map((item, index) => {
            // Replace spaces with dashes
            const category = item.node.frontmatter.categoryName
            const categorySlug = category.replace(/\s+/g, '-').toLowerCase()
            return (
              <Menu.Item
                name={categorySlug}
                active={activeItem === categorySlug}
                onClick={handleClick}
                as={Link}
                to={`/catalogo/${categorySlug}/`}
                key={index}
              >
                <h2>{category}</h2>
              </Menu.Item>
            )
          })}
        </Menu>
      </div>
    </Container>
  )
}

export default Navigation
