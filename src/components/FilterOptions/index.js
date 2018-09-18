import React from "react"
import PropTypes from "prop-types"

import "./style.styl"



export const FilterOptions = ({ children }) => (
	<div className="filter-options-wrapper">
		<div className="filter-options">
			{children}
		</div>
	</div>
)



FilterOptions.displayName = "FilterOptions"



FilterOptions.propTypes = {
	children: PropTypes.node,
}



export default FilterOptions