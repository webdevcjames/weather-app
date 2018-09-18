import React from "react"
import PropTypes from "prop-types"

import "./style.styl"



export const FilterOption = ({ children, onSelect, selected }) => (
	<div
		className={`filter-option ${selected ? "selected" : ""}`.trim()}
		onClick={onSelect}
	>
		<div className="filter-content">
		  {children}
		</div>
	</div>
)



FilterOption.displayName = "FilterOption"



FilterOption.propTypes = {
	children: PropTypes.node,
	onSelect: PropTypes.func,
	selected: PropTypes.bool
}



export default FilterOption