import React, {useState} from 'react'
import AutocompleteInput from './autocomplete_input'
import MapComponent from './map_component'
import TransitDetails from './transit_details'

const onSelectAutocomplete = (element, hookCallback) => {
  if (element === null) {
    hookCallback({})
    return
  }
  hookCallback({ ...element })
}

const AppContainer = () => {
  const [fromValues, setFromValues] = useState({})
  const [toValues, setToValues] = useState({})
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
      </div>
      <div className="showmap-container">
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
