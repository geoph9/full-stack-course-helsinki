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

const SingleCountry = ({country}) => {
  if (country === '') {
    return (<></>)
  }
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

export default SingleCountry