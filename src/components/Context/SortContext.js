import React from 'react'

const SortContext = React.createContext({
  sortChoice: null,
  updateSortChoice: () => {},
})

export default SortContext
