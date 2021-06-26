import React from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const Persons = ({ persons, filterValue }) => {
  return (
    <ul>
      { persons.filter(person => person.name.toLowerCase().includes(filterValue)).map(person =>           
        <Person key={person.name} person={person} />
      )}
    </ul>
    
  )
}

export default Persons