import React, { useState } from 'react'
import Countries from './components/Countries'
import SingleCountry from './components/SingleCountry'
import Filter from './components/Filter'
import Weather from './components/Weather'
import axios from 'axios';

const maxNumberOfCountries = 10;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [chosenCountry, setChosenCountry] = useState('');
  const [weather, setWeather] = useState({});

  const [ filterValue, setFilterValue ] = useState('')

  // const updateWeather = (query) => {
  //   axios
  //     .get(`http://api.weatherstack.com/current?access_key=${weatherStackApiKey}?query=${query}`)
  //     .then(response => {
  //       setWeather(response.data.current)
  //     })
  // }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // An array of minimum length 0 and maximum length maxNumberOfCountries+1.
        // if the length is maxNumberOfCountries+1 then we will show a 
        // warning (check the Countries component).
        setCountries(response.data.filter(
          country => country.name.toLowerCase().includes(event.target.value)
        ).slice(0, maxNumberOfCountries+1));
      })
  }

  return (
    <div>
      <Filter filterValue={filterValue} handleFilterChange={handleFilterChange} />
      <Countries
        countries={countries}
        maxNumberOfCountries={maxNumberOfCountries}
        setChosenCountry={setChosenCountry}
        setWeather={setWeather}
      />
      <SingleCountry country={chosenCountry} />
      <Weather country={chosenCountry} weather={weather} />
    </div>
  )
}

export default App