import React, {useState} from 'react'
import Autocomplete from 'react-autocomplete'
import AutocompleteInput from './autocomplete_input'
import MapComponent from './map_component'
import TransitDetails from './transit_details'
import api from "./api"
import uuid from 'uuid'

const RESTRICTED_CHARACTERS = [ '[', ']' ]

const onSelectAutocomplete = (element, hookCallback) => {
  if (element === null) {
    hookCallback({})
    return
  }
  hookCallback({ ...element })
}

// FOR REACTJS AUTOCOMPLETE
const onAutocompleteInputChange = (e, setAutocompleteValue, setAutocompleteItems, toValues, setToValues) => {
  const { value } = e.target
  const splitValue = value.split('')
  if (RESTRICTED_CHARACTERS.includes(splitValue[splitValue.length - 1])) { return }
  const payload = {
    type: 'to',
    query: value,
  }
  api.get(payload, '/autocompletes').then(data => {
    if (toValues.name) {
      setToValues({})
    }
    setAutocompleteValue(value)
    setAutocompleteItems(data)
  })
}

const AppContainer = () => {
  const [fromValues, setFromValues] = useState({})
  const [toValues, setToValues] = useState({})
  const [autocompleteValue, setAutocompleteValue] = useState('')
  const [autocompleteItems, setAutocompleteItems] = useState([])
  return (
    <div className="app-container">
      <div className="input-container">
        <AutocompleteInput
          searchType="from"
          placeholder="From"
          onSelect={(element) => onSelectAutocomplete(element, setFromValues)}
        />
        <AutocompleteInput
          searchType="to"
          placeholder="To"
          onSelect={(element) => onSelectAutocomplete(element, setToValues)}
        />
      <div className="input-list-container">
        <Autocomplete
          getItemValue={(item) => item.name}
          items={autocompleteItems}
          renderItem={(item, isHighlighted) =>
            <div className="elementlist" key={uuid()}>
              { item.name }
            </div>
          }
          renderMenu={ (items, value) => {
            return <div className="elementlist-container" children={items}/>
          }}
          value={autocompleteValue}
          onChange={(e) => onAutocompleteInputChange(e, setAutocompleteValue, setAutocompleteItems, toValues, setToValues)}
          onSelect={(val, item) => {
            setAutocompleteValue(val)
            onSelectAutocomplete(item, setToValues)
          }}
          inputProps={{ className: 'input' }}
        />
    </div>
      </div>
      <div id="showmap" className="showmap-container">
        {
          (fromValues.lat || toValues.lat) && (
            <MapComponent
              fromLat={fromValues.lat}
              fromLng={fromValues.lng}
              toLat={toValues.lat}
              toLng={toValues.lng}
            />
          )
        }
        {
        (!fromValues.lat && !fromValues.lng && !toValues.lat && !toValues.lng) && (
            <div className="map-without-elements">
              <div className="map-text-header">
                <h2>Wypełnij pole FROM i(lub) TO, aby wyświetlić mapę </h2>
              </div>
              <div className="map-text-describe">
                <h3>
                  Domyślne ustawienie, czyli wyświetlenie defaultowej pozycji było łatwe, <br/>
                  dlatego zdecydowałem się użyć "łatki", która odświeży się po wprowadzeniu danych. <br/>
                  <br/>
                  dla nauki :)
                </h3>
              </div>
            </div>
          )
        }
      </div>
      <div className="transit-detail-main">
        {
          fromValues.name && (
            <TransitDetails
              name={fromValues.name}
              arrivalTime={fromValues.arrivalTime}
              departureTime={fromValues.departureTime}
            />
          )
        }
        {
          toValues.name && (
            <TransitDetails
              name={toValues.name}
              arrivalTime={toValues.arrivalTime}
              departureTime={toValues.departureTime}
            />
          )
        }
      </div>
    </div>
  )
}

export default AppContainer
