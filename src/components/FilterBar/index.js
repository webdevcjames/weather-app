import React from "react"
import PropTypes from "prop-types"

import map from "lodash/map"

import FilterOption from "../../components/FilterOption"
import FilterOptions from "../../components/FilterOptions"

import "./style.styl"



export const FilterBar = ({ conditions, countries, filters, onToggleFilter, onToggleBar, open }) => {

	const selectCondition = condition => {
		onToggleFilter("weather", condition)
	}

	const selectCountry = country => {
		onToggleFilter("country", country)
	}


	
	const toggle = e => {
		e.preventDefault()
		onToggleBar()
	}



	// Had considered a tab or accordion structure for the filter list, but for the size of the list as is, decided to keep it simple with grouping the list
	return (
		<div className={`filter-bar ${open ? "open" : ""}`.trim()}>
			<div className="filter-bar-button" onClick={toggle}>
				{open ? <i className="material-icons">keyboard_arrow_down</i> : "Filter"}
			</div>
			<FilterOptions>
				{countries &&
					<div className="filter-group"><div className="filter-group-heading">Countries</div></div>}
				{countries && map(countries, (country, key) => (
					<FilterOption
						key={key}
						onSelect={() => selectCountry(key)}
						selected={filters.country.includes(key)}
					>
					  {country}
					</FilterOption>
				))}
				{conditions &&
					<div className="filter-group"><div className="filter-group-heading">Weather Conditions</div></div>}
				{conditions && conditions.map(condition => (
					<FilterOption
						key={condition}
						onSelect={() => selectCondition(condition)}
						selected={filters.weather.includes(condition)}
					>
					  {condition}
					</FilterOption>
				))}
			</FilterOptions>
		</div>
	)
}



FilterBar.displayName = "FilterBar"



FilterBar.propTypes = {
	conditions:     PropTypes.array,
	countries:      PropTypes.object,
	filters:        PropTypes.object,
	onToggleFilter: PropTypes.func,
	onToggleBar:    PropTypes.func,
	open:           PropTypes.bool
}



export default FilterBar