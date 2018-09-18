import React from "react"
import PropTypes from "prop-types"

import map from "lodash/map"

import "./style.styl"



export const SortBar = ({ onSort, sortDir, sortType, sortTypes = {} }) => {

	const sort = (e, type) => {
		e.preventDefault()
		onSort(type)
	}



	return (
		<div className="sort-bar">
			{map(sortTypes, (label, type) => {
				const active = type == sortType
				return (
					<a key={type} className={`sort-option ${active ? "active" : ""}`.trim()} href="#" onClick={e => sort(e, type)}>
						<div className="sort-label" dangerouslySetInnerHTML={{ __html: label }} />
						{active && <i className={`material-icons ${sortDir == "desc" ? "desc" : ""}`.trim()}>arrow_drop_up</i>}
					</a>
				)})}
		</div>
	)
}



SortBar.displayName = "SortBar"



SortBar.propTypes = {
	sortDir:   PropTypes.string,
	sortType:  PropTypes.string,
	sortTypes: PropTypes.object,
}



export default SortBar