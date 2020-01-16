import React from 'react'
import PropTypes from "prop-types"

const TransitDetails = ({ name, arrivalTime, departureTime }) => {
  return (
    <div className="transit-details-container">
      <div className="element-name">
        <h2>{name}</h2>
      </div>
      <div className="arrival-time-container">
        <h3 className="arrival-time">Arrival time: {arrivalTime}</h3>
      </div>
      <div className="departure-time-container">
        <h3 className="departure-time">Departure time: {departureTime}</h3>
      </div>
    </div>
  )
}

TransitDetails.propTypes = {
  name: PropTypes.string.isRequired,
  arrivalTime: PropTypes.string.isRequired,
  departureTime: PropTypes.string.isRequired,
}

export default TransitDetails
