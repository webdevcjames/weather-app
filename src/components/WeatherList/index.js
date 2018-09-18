import React from "react"
import PropTypes from "prop-types"

import "./style.styl"



export const WeatherList = ({ children }) => (
	<div className="weather-list-wrapper">
	  <ul className="weather-list">
	  	{children}
	  </ul>
	</div>
)



WeatherList.displayName = "WeatherList"



WeatherList.propTypes = {
	children: PropTypes.node
}



export default WeatherList