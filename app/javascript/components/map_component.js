import React from 'react'
import PropTypes from "prop-types"
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'

const isFloat = n => Number(n) === n && n % 1 !== 0

const calculateCenter = (fromLat, fromLng, toLat, toLng) => {
  if (fromLat && toLat) {
    return (
      { lat: ((fromLat + toLat)/2), lng: ((fromLng + toLng)/2) }
    )
  }
    else {
      return (
        { lat: (fromLat || toLat), lng: (fromLng || toLng) }
      )
    }
  }

const calculateZoom = (fromLat, fromLng, toLat, toLng) => {
  let newZoom = 15
  if (fromLat && toLat) {
    newZoom = 11
  }
  return newZoom
}

const CustomComponent = withScriptjs(withGoogleMap((props) => {
  const { fromLat, fromLng, toLat, toLng } = props
  return (
    <GoogleMap
      zoom={calculateZoom(fromLat, fromLng, toLat, toLng)}
      center={calculateCenter(fromLat, fromLng, toLat, toLng)}
    >
    {
      isFloat(fromLat) && isFloat(fromLng) && (<Marker
      position={{ lat: fromLat, lng: fromLng }}
      />)}

    {
      isFloat(toLat) && isFloat(toLng) && (<Marker
      position={{ lat: toLat, lng: toLng}}
      />)}
    </GoogleMap>
  )
}
))

const MapComponent = ({ fromLat, fromLng, toLat, toLng }) => {
  return (
    <div style={{ width: '70vw' }}>
      <CustomComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        fromLat={fromLat}
        fromLng={fromLng}
        toLat={toLat}
        toLng={toLng}
        />
    </div>
  )
}

export default MapComponent