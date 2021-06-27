import React from 'react'

const Image = ({url}) => {
  return (
    <img src={url} height="80px" width="80px" />
  )
}

const Language = ({language}) => {
    return (
        <li>{language.name}</li>
    )
}

const SingleCountryStats = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages:</h2>
      <ul>
        { country.languages.map(language =>           
          <Language key={language.name} language={language} />
        )}
      </ul>
      <Image url={country.flag} />
    </div>
  )
}

const Country = ({country}) => {
  return (
    <p>{country.name}</p>
  )
}

const Countries = ({ countries, maxNumberOfCountries }) => {
  if (countries.length > maxNumberOfCountries) {
    return (
      <p>Too many matches, specify another filter.</p>
    )
  } else if (countries.length === 1) {
      return (
        <SingleCountryStats key={countries[0].name} country={countries[0]} />
      )
  }
  return (
    <div>
      { countries.map(country =>           
        <Country key={country.name} country={country} />
      )}
    </div>
  )
}

export default Countries