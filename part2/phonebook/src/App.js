import React, { useState } from 'react'
import Persons from './components/Persons'
import Header, {SubHeader} from './components/Header'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    if (newName === '' || newNumber === '') {
      alert("Expected a pair of a person's name and their phone number while only one of those were found.")
      return
    }
    const person = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1,
    }
  
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
    setFilterValue('')
  }

  const handleNewName = (event) => {
    // console.log(`name target: ${event.target.value}`);
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  const handleFilterNames = (event) => {
    // console.log(event.target.value);
    setFilterValue(event.target.value);
  }

  return (
    <div>
      <Header text="Phonebook" />
      <Filter filterValue={filterValue} handleFilterNames={handleFilterNames} />
      <SubHeader text="Add a New" />
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNewName={handleNewName} 
        newNumber={newNumber} 
        handleNewNumber={handleNewNumber}
      />
      <SubHeader text="Numbers" />
      <Persons 
        persons={persons}
        filterValue={filterValue}
      />
    </div>
  )
}

export default App