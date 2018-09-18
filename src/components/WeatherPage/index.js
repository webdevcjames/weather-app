import React from "react"
import PropTypes from "prop-types"

import isNaN from "lodash/isNaN"
import isNumber from "lodash/isNumber"
import moment from "moment"

import "./style.styl"



export const WeatherPage = ({ onClose, open, selectedItem = {} }) => {
	const { humidity, lastUpdated, name, temperature: { actual, feelsLike } = {}, weather, wind } = selectedItem
	
	const close = e => {
		e.preventDefault()
		onClose()
	}

	const isValidTemp = isNumber(parseInt(actual)) && !isNaN(parseInt(actual))

	const temperatureColor = isValidTemp
		? (parseInt(actual) > 39
			? "#df3737"
			: (parseInt(actual) > 29
				? "#ef9f2f"
				: (parseInt(actual) > 19
					? "#4faf3f"
					: (parseInt(actual) > 9
						? "#5f9fef"
						: "#2f4fcf"))))
		: undefined


	return (
		<div className={`selected-weather ${open ? "open" : ""}`.trim()}>
			<div className="selected-weather-button" onClick={close}>
				{open ? <i className="material-icons">keyboard_arrow_down</i> : "Filter"}
			</div>

			<div className="selected-weather-info">
				<div className="weather-list-item">
					<div className="weather-content">
						<h2 className="weather-suburb">{name}</h2>
						<h3 className="weather-condition">{weather}</h3>
					</div>
					<div
						className="weather-temperature"
						style={{ color: temperatureColor }}
						dangerouslySetInnerHTML={{ __html: isValidTemp ? `${actual}&deg;` : "N/A" }}
					/>
				</div>
				<div className="weather-details">
					<div className="weather-detail">
						<h4 className="weather-detail-heading">Feels Like</h4>
						<span
							className="weather-detail-value"
							style={{ color: temperatureColor }}
							dangerouslySetInnerHTML={{ __html: isValidTemp ? `${actual}&deg;` : "N/A" }}
						/>
					</div>
					<div className="weather-detail">
						<h4 className="weather-detail-heading">Humidity</h4>
						<span className="weather-detail-value" style={{ color: temperatureColor }}>{humidity ? humidity : "N/A"}</span>
					</div>
					<div className="weather-detail">
						<h4 className="weather-detail-heading">Wind</h4>
						<span className="weather-detail-value" style={{ color: temperatureColor }}>{wind ? wind : "N/A"}</span>
					</div>
				</div>
				<div className="weather-updated">
					Last Updated &ndash; <em>{lastUpdated ? moment(lastUpdated, "X").format("h:mma DD MMMM YYYY") : "N/A"}</em>
				</div>
			</div>
		</div>
	)
}



WeatherPage.displayName = "WeatherPage"



WeatherPage.propTypes = {
	onClose:      PropTypes.func,
	open:         PropTypes.bool,
	selectedItem: PropTypes.object
}



export default WeatherPage