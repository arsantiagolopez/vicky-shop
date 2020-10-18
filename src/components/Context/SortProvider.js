import React, {useState} from 'react'
import SortContext from './SortContext'

const SortProvider = ({children}) => {
  const [sortChoice, setSortChoice] = useState()

  const updateSortChoice = choice => {
    setSortChoice(choice)
  }

  return (
    <SortContext.Provider value={{sortChoice, updateSortChoice}}>
      {children}
    </SortContext.Provider>
  )
}

export default SortProvider
