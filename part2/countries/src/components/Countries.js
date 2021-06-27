import React from 'react'
// import weatherStackApiKey from '../weatherStackApiKey'
import axios from 'axios';

const weatherStackApiKey = process.env.REACT_APP_API_KEY

const Country = ({country, setChosenCountry, setWeather}) => {
  const updateChosenCountry = () => {
    let url = `http://api.weatherstack.com/current?access_key=${weatherStackApiKey}&query=${country.capital}`
    setChosenCountry(country)
    axios
      .get(url)
      .then(response => {
        setWeather(response.data.current)
      })
  }
  return (
    <div>
      {country.name} <button onClick={updateChosenCountry} >
        show
      </button>
    </div>
  )
}

const Countries = ({ countries, maxNumberOfCountries, setChosenCountry, setWeather }) => {
  if (countries.length > maxNumberOfCountries) {
    setChosenCountry('')
    return (
      <p>Too many matches, specify another filter.</p>
    )
  } else if (countries.length === 1) {
    let url = `http://api.weatherstack.com/current?access_key=${weatherStackApiKey}&query=${countries[0].capital}`
    setChosenCountry(countries[0])
    axios
      .get(url)
      .then(response => {
        setWeather(response.data.current)
      })
    return (<></>)
  } else if (countries.length === 0) {
    setChosenCountry('')
    return (<></>)
  }
  return (
    <div>
      { countries.map(country =>           
        <Country key={country.name} 
          country={country} 
          setChosenCountry={setChosenCountry} 
          setWeather={setWeather}
        />
      )}
    </div>
  )
}

export default Countries