import React from 'react'
import Headroom from 'react-headroom'
import Footer from '../Footer'
import Header from '../Header'

const Layout = ({children, path}) => (
  <>
    <Headroom
      style={{
        zIndex: `20`,
        height: `5em`,
        backdropFilter: `blur(7px)`,
        boxShadow: `0 5px 20px 0 rgba(34, 36, 38, 0.15)`,
      }}
    >
      <Header path={path} />
    </Headroom>
    <div style={{minWidth: `65vw`}}>
      <main>{children}</main>
    </div>
    <Footer />
  </>
)

export default Layout
