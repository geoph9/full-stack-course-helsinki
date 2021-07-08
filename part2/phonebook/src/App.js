import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import Header, {SubHeader} from './components/Header'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
// import axios from 'axios';
import personService from './services/persons'

const showNotification = (setNotification, text, timeout=3000) => {
  setNotification(text)
  setTimeout(() => {
    setNotification(null)
  }, timeout)
}

const App = () => {
  const [persons, setPersons] = useState([]);

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }
  useEffect(hook, [])

  const updatePerson = (person) => {
    const replaceConfirm = window.confirm(`${newName} is already added to the phonebook, replace the old number?`)
    if (replaceConfirm === false) return

    // const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, number: newNumber }

    personService
      .update(person.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        showNotification(setNotification, `Updated ${person.name}`, 3000)
      })
      .catch(error => {
        // alert(
        //   `Person '${person.name}' could not be found in the server.`
        // )
        showNotification(
          setErrorMessage, 
          `Information of ${person.name} has already been removed from the server`, 
          5000
        )

        // setPersons(n => n.id !== person.id)
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).includes(newName)) {
      const thatPerson = persons.filter((person) => person.name === newName)[0];
      if (thatPerson.number === newNumber) {
        alert(`${newName} is already added to the phonebook`)
        return
      }
      updatePerson(thatPerson)
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
  
    personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setFilterValue('')
        showNotification(setNotification, `Added ${person.name}`, 3000)
      })
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

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    const confirmation = window.confirm(`Delete ${person.name}?`);
    if (confirmation === false) {
      return
    }
    if (!persons.map((p) => p.name).includes(person.name)) {
      alert(`${newName} is not a part of the phonebook`)
      return
    }
  
    personService
      .remove(id)
      .then(returnedPerson => {
        setPersons(
          persons.filter(p => p.id !== id)
        )
        setNewName('')
        setNewNumber('')
        setFilterValue('')
        showNotification(setNotification, `Deleted ${person.name}`, 3000)
      })
      .catch(error => {
        alert(
          `The person '${person.name}' was already deleted from the server.`
        )
        setPersons(p => p.id !== id)
      })
  }

  return (
    <div>
      <Header text="Phonebook" />
      <Notification message={notification} type="notification" />
      <Notification message={errorMessage} type="error" />
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
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App