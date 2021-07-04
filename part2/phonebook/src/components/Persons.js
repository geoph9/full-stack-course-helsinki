import React from 'react'

const Person = ({ person, removePerson }) => {
  return (
    <li>
      {person.name} 
      {person.number}
      <button onClick={removePerson}>Remove</button>
    </li>
  )
}

const Persons = ({ persons, filterValue, deletePerson }) => {
  return (
    <ul>
      { persons.filter(person => person.name.toLowerCase().includes(filterValue)).map(person =>           
        <Person 
          key={person.name} 
          person={person} 
          removePerson={() => deletePerson(person.id)} />
      )}
    </ul>
    
  )
}

export default Persons