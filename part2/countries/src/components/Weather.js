import React from 'react'
import Image from './Image'

const Weather = ({country, weather}) => {
  console.log("Weather", weather)
  if (country === '' || weather === undefined || Object.entries(weather).length === 0) {
    return (<></>)
  }
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <h3>Temperature: {weather.temperature} Celsius</h3>
      <Image url={weather.weather_icons[0]} width="65px" height="65px" />
      <h3>Wind: {`${weather.wind_speed} mph direction ${weather.wind_dir}`}</h3>
    </div>
  )
}

export default Weather