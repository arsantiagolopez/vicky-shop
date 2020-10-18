import React, {useContext, useState} from 'react'
import {Accordion, Icon} from 'semantic-ui-react'
import SortContext from '../Context/SortContext'
import './index.css'

const SortBy = () => {
  const [activeIndex, setActiveIndex] = useState()
  const {sortChoice, updateSortChoice} = useContext(SortContext)

  // Handle accordion
  const handleAccordion = (e, titleProps) => {
    const {index} = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex)
  }

  // Handle choice global context
  const handleChoiceSelect = choice => {
    updateSortChoice(choice)
    setActiveIndex()
  }

  return (
    <Accordion>
      {sortChoice ? (
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleAccordion}
        >
          <Icon name="sort" size="large" fitted />
          {sortChoice === 'Reciente' ? (
            <Icon
              name="calendar outline"
              size="large"
              color="black"
              style={{marginLeft: `5px`}}
            />
          ) : (
            <Icon name="sort alphabet ascending" size="large" color="black" />
          )}
        </Accordion.Title>
      ) : (
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleAccordion}
        >
          <Icon name="sort" size="large" />
        </Accordion.Title>
      )}

      <Accordion.Content active={activeIndex === 0} className="sortItems">
        <p onClick={() => handleChoiceSelect('Nombre')}>Nombre</p>
        <p onClick={() => handleChoiceSelect('Reciente')}>Reciente</p>
      </Accordion.Content>
    </Accordion>
  )
}

export default SortBy
