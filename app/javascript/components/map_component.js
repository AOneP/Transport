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

const getBoundsZoomLevel = (bounds, mapDim) => {
  const WORLD_DIM = { height: 256, width: 256 };
  const ZOOM_MAX = 21;

  function latRad(lat) {
    var sin = Math.sin(lat * Math.PI / 180);
    var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  }

  function zoom(mapPx, worldPx, fraction) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  }

  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();

  const latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

  const lngDiff = ne.lng() - sw.lng();
  const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

  const latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
  const lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

  return Math.min(latZoom, lngZoom, ZOOM_MAX);
}

const CustomMapComponent = withScriptjs(withGoogleMap((props) => {
  const { fromLat, fromLng, toLat, toLng } = props
  const mapElement = document.getElementById("showmap")
  const mapDim = { height: mapElement.offsetHeight, width: mapElement.offsetWidth }
  const bounds = new window.google.maps.LatLngBounds()

  if (fromLat && fromLng) {
    bounds.extend({ lat: fromLat, lng: fromLng})
  }
  if (toLat && toLng) {
    bounds.extend({ lat: toLat, lng: toLng})
  }

  return (
    <GoogleMap
      zoom={getBoundsZoomLevel(bounds, mapDim)}
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
}))

const MapComponent = ({ fromLat, fromLng, toLat, toLng }) => {
  return (
    <div style={{ width: '70vw' }}>
      <CustomMapComponent
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
