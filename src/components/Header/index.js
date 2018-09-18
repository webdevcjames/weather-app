import React from "react"
import PropTypes from "prop-types"

import "./style.styl"



export const Header = ({ onRefresh }) => {
	
	const refresh = e => {
		e.preventDefault()
		onRefresh()
	}



	return (
		<div className="app-header">
			<h1 className="app-title" style={{ paddingLeft: onRefresh && "56px" }}>
				Weather
			</h1>
			{onRefresh && (
				<a className="app-refresh" href="#" onClick={refresh} title="Click to refresh...">
					<i className="material-icons">refresh</i>
				</a>
			)}
		</div>
	)
}



Header.displayName = "Header"



Header.propTypes = {
	onRefresh: PropTypes.func
}



export default Header