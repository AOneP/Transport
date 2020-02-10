import React, {useState} from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import MapComponent from './map_component'
import { geocodeByPlaceId } from 'react-google-places-autocomplete'

// Jeżeli CSS to odkomentuj
// import 'react-google-places-autocomplete/dist/assets/index.css';


const XAppContainer = () => {
  const [fromValues, setFromValues] = useState({})
  const [toValues, setToValues] = useState({})
  return (
    <div>
      <div className="input-container">
        <GooglePlacesAutocomplete
          onSelect={( place ) => (
            geocodeByPlaceId(place.place_id)
            .then(results => {
              setFromValues({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              })
            })
          )}
          renderSuggestions={(active, suggestions, onSelectSuggestion) => (
          <div className="suggestions-container">
            {
              suggestions.map((suggestion) => (
                <div
                  className="suggestion"
                  onClick={(event) => onSelectSuggestion(suggestion, event)}
                >
                  {suggestion.description}
                </div>
              ))
            }
          </div>
        )}
        />
      </div>
      <div className="input-container">
        <GooglePlacesAutocomplete
          onSelect={( place ) => {
            return (
              geocodeByPlaceId(place.place_id)
              .then(results => {
                setToValues({
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng(),
                })
              })
            )}}
          renderSuggestions={(active, suggestions, onSelectSuggestion) => (
          <div className="suggestions-container">
            {
              suggestions.map((suggestion) => (
                <div
                  className="suggestion"
                  onClick={(event) => onSelectSuggestion(suggestion, event)}
                >
                  {suggestion.description}
                </div>
              ))
            }
          </div>
        )}
        />
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
    </div>
  )}


export default XAppContainer
