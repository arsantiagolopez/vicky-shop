import React from 'react'
import SortProvider from './src/components/Context/SortProvider'

export const wrapRootElement = ({element}) => (
  <SortProvider>{element}</SortProvider>
)
