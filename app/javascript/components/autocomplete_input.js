import React,{ useState } from "react"
import PropTypes from "prop-types"
import api from "./api"
import uuid from 'uuid'

const RESTRICTED_CHARACTERS = [ '[', ']' ]

const onClickElement = (element, setListElements, setInputValue, setSelectedValue, selectedValue, onSelect) => {
  onSelect(element)
  setInputValue(element.name)
  setListElements([])
  setSelectedValue(element)
}

const renderList = (collection, setListElements, setInputValue, setSelectedValue, selectedValue, onSelect) => {
  return collection.map((element) => {
    return (
      <div className="elementlist" onClick={() => onClickElement(element, setListElements, setInputValue, setSelectedValue, selectedValue, onSelect)} key={uuid()}>
        { element.name }
      </div>
    )
  })
}

const onInputChange = (e, searchType, setInputValue, setListElements, selectedValue, setSelectedValue, onSelect) => {
  const { value } = e.target
  const splitValue = value.split('')
  if (RESTRICTED_CHARACTERS.includes(splitValue[splitValue.length - 1])) { return }
  const payload = {
      type: searchType,
      query: value,
    }


    api.get(payload, '/autocompletes').then(data => {
      if (selectedValue) {
        setSelectedValue(null)
        onSelect(null)
      }
      setInputValue(value)
      setListElements(data)
    })
  }

const AutocompleteInput = ({ searchType, placeholder, onSelect }) => {
  const [inputValue, setInputValue] = useState('')
  const [listElements, setListElements] = useState([])
  const [selectedValue, setSelectedValue] = useState(null)
  return (
    <div className="input-list-container">
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e, searchType, setInputValue, setListElements, selectedValue, setSelectedValue, onSelect)}
          className="input"
          placeholder={placeholder}
        />
      </div>
      <div className="elementlist-container">
        {renderList(listElements, setListElements, setInputValue, setSelectedValue, selectedValue, onSelect)}
      </div>
    </div>
  )
}

AutocompleteInput.propTypes = {
  searchType: PropTypes.string.isRequired,
}

export default AutocompleteInput
