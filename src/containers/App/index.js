import React, { Component as Container } from "react"

import axios from "axios"
import fromPairs from "lodash/fromPairs"
import intersectionBy from "lodash/intersectionBy"
import isEmpty from "lodash/isEmpty"
import moment from "moment"
import pickBy from "lodash/pickBy"
import sortBy from "lodash/sortBy"
import uniq from "lodash/uniq"

import FilterBar from "../../components/FilterBar"
import Header from "../../components/Header"
import SortBar from "../../components/SortBar"
import WeatherList from "../../components/WeatherList"
import WeatherListItem from "../../components/WeatherListItem"
import WeatherPage from "../../components/WeatherPage"

import "./style.styl"



const dataURL   = "api/venues/weather.json"

const sortTypes = { aToZ: "A&ndash;Z", temperature: "Temperature", lastUpdated: "Last Updated" }



export class App extends Container {

	constructor(props) {
		super(props)

		this.state = {
			conditions:  [],
			countries:   {},
			filters:     {
				country: [],
				weather: [],
			},
			filtersOpen: false,
			items:       [],
			lastUpdated: "",
			rawData:     [],
			selected:    undefined,
			sortDir:     "asc",
			sortType:    "aToZ",
		}

		this.loadItems()
	}



	async loadItems() {
		axios.get(dataURL)
			.then(({ data: { data } }) => {
				if (data) {
					const conditions = uniq(data.map(({ _weatherCondition }) => _weatherCondition)).filter(condition => !!condition).sort((a, b) => a.localeCompare(b))
					const countries  = fromPairs(data.map(({ _country = {} }) => [ _country._countryID, _country._name ]))

					const weatherData = this.processData(data)

					const lastUpdated = moment().format("h:mma DD MMMM YYYY")

					this.setState({ conditions, countries, items: weatherData, lastUpdated, rawData: data })					
				}
			})
			.catch(error => {
				console.warn(error)
			})
	}



	closeWeatherPage() {
		this.setState({ selected: undefined })
	}


	// Best filtering solution I could come up with at the time, and somewhat flexible
	filterData(data) {
		const validFilters = pickBy(this.state.filters, filter => !isEmpty(filter))

		if(isEmpty(validFilters)) return data

		return intersectionBy(
			...Object.keys(validFilters).map(key => data.filter(item => validFilters[key].includes(item[key]))),
			"id"
		)
	}



	// Abstracted processData just so it was easier to reuse
	processData(data) {
		const sanitisedData = this.sanitiseData(data)

		const filteredData = this.filterData(sanitisedData)

		return this.sortData(filteredData)
	}



	sanitiseData(data) {
		return data.map(({
			_venueID: id,
			_name: name,
			_country: country = {},
			_weatherCondition: weather,
			_weatherHumidity: humidity = "",
			_weatherWind: wind = "",
			_weatherTemp: actual,
			_weatherFeelsLike: feelsLike,
			_weatherLastUpdated: lastUpdated,
		}) => ({
			id,
			name,
			country: country._countryID,
			weather,
			humidity: humidity.replace(/Humidity:/g, "").trim(),
			wind: wind.replace(/Wind:/g, "").trim(),
			temperature: {
				actual,
				feelsLike,
			},
			lastUpdated,
		})).filter(({ temperature: { actual, feelsLike }, weather }) => (!!actual && !!feelsLike) || !!weather) // Thought I should omit any results that hove no weather information at all
	}



	selectWeatherItem(item) {
		this.setState({ selected: item })
	}



	setSorting(type) {
		const { rawData, sortDir, sortType } = this.state
		let dir = "asc"

		if ((type == sortType) && (dir == sortDir)) dir = "desc"

		this.setState({ sortDir: dir, sortType: type }, () => this.updateData(rawData))
	}



	sortData(data) {
		const { sortDir, sortType } = this.state

		const isAsc = sortDir == "asc"

		switch(sortType) {
			case "aToZ":
				return [...data].sort((a, b) => isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
			
			case "temperature":
				return [...data].sort((a = 0, b = 0) => isAsc
					? parseInt(a.temperature.actual) - parseInt(b.temperature.actual)
					: parseInt(b.temperature.actual) - parseInt(a.temperature.actual))
			
			case "lastUpdated":
				return [...data].sort((a = 0, b = 0) => isAsc
					? parseInt(a.lastUpdated) - parseInt(b.lastUpdated)
					: parseInt(b.lastUpdated) - parseInt(a.lastUpdated))
			
			default:
				return data
		}
	}



	toggleFilterBar() {
		this.setState({ filtersOpen: !this.state.filtersOpen })
	}



	toggleFilterOption(key, option) {
		const { filters, rawData } = this.state
		
		let filterGroup = [ ...filters[key] ]
		filterGroup = filterGroup.includes(option)
			? filters[key].filter(filter => filter != option)
			: [ ...filters[key], option ]

		this.setState({ filters: { ...filters, [key]: filterGroup } }, () => this.updateData(rawData))
	}



	updateData(data) {
		const weatherData = this.processData(data)

		this.setState({ items: weatherData })	
	}



	// I would normally mount/unmount components like WeatherPage rather than keeping them rendered, but for the sake of the transitions, I left them rendered
	render() {
		const { conditions, countries, filters, filtersOpen, items, lastUpdated, selected, sortDir, sortType } = this.state

		return (
			<div className="app-wrapper">
				<Header onRefresh={this.loadItems.bind(this)} />
				<div className="app-content">
					<div className={`list-view ${selected ? "closed" : ""}`.trim()}>
						<div className={`weather-list-wrapper ${filtersOpen ? "closed" : ""}`.trim()}>
							<SortBar onSort={this.setSorting.bind(this)} sortDir={sortDir} sortType={sortType} sortTypes={sortTypes} />
							<WeatherList>
								{items.map(item => <WeatherListItem key={item.id} item={item} onSelect={() => this.selectWeatherItem(item)} />)}
							</WeatherList>
						</div>
						<FilterBar
							conditions={conditions}
							countries={countries}
							filters={filters}
							onToggleFilter={this.toggleFilterOption.bind(this)}
							onToggleBar={this.toggleFilterBar.bind(this)}
							open={filtersOpen}
						/>
					</div>
					<WeatherPage onClose={this.closeWeatherPage.bind(this)} open={!!selected} selectedItem={selected} />
				</div>
				<div className="app-last-refreshed">Data Last Refreshed &ndash; <em>{lastUpdated}</em></div>
			</div>
		)
	}
}



App.displayName = "App"



export default App
