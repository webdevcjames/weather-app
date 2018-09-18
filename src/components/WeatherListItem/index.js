import React from "react"
import PropTypes from "prop-types"

import isNaN from "lodash/isNaN"
import isNumber from "lodash/isNumber"
import moment from "moment"

import "./style.styl"



export const WeatherListItem = ({ item, onSelect }) => {
	const { name, temperature: { actual }, weather } = item

	const isValidTemp = isNumber(parseInt(actual)) && !isNaN(parseInt(actual))

	const temperatureColor = isValidTemp
		? (parseInt(actual) > 39
			? "#df3737"
			: (parseInt(actual) > 29
				? "#ef9f2f"
				: (parseInt(actual) > 19
					? "#6fcf4f"
					: (parseInt(actual) > 9
						? "#5f9fef"
						: "#3f3fbf"))))
		: undefined



	return (
		<li className="weather-list-item" onClick={onSelect}>
			<div className="weather-content">
				<h2 className="weather-suburb">{name}</h2>
				<h3 className="weather-condition">{weather}</h3>
			</div>
			<div
				className="weather-temperature"
				style={{ color: temperatureColor }}
				dangerouslySetInnerHTML={{ __html: isValidTemp ? `${actual}&deg;` : "N/A" }}
			/>
		</li>
	)
}



WeatherListItem.displayName = "WeatherListItem"



WeatherListItem.propTypes = {
	item:     PropTypes.object,
	onSelect: PropTypes.func
}



export default WeatherListItem
