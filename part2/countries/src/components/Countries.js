import React from 'react'

const Country = ({country, setChosenCountry}) => {
  return (
    <div>
      {country.name} <button onClick={() => setChosenCountry(country)} >
        show
      </button>
    </div>
  )
}

const Countries = ({ countries, maxNumberOfCountries, setChosenCountry }) => {
  if (countries.length > maxNumberOfCountries) {
    setChosenCountry('')
    return (
      <p>Too many matches, specify another filter.</p>
    )
  } else if (countries.length === 1) {
    setChosenCountry(countries[0])
    //   return (
    //     <SingleCountryStats key={countries[0].name} country={countries[0]} />
    //   )
  } else if (countries.length === 0) {
    setChosenCountry('')
    return (<></>)
  }
  return (
    <div>
      { countries.map(country =>           
        <Country key={country.name} country={country} setChosenCountry={setChosenCountry} />
      )}
    </div>
  )
}

export default Countries