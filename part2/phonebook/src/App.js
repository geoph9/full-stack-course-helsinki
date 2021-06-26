import React, { useState } from 'react'
import Person from './components/Person'
import Header, {SubHeader} from './components/Header'

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
    const person = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1,
    }
  
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    console.log(`name target: ${event.target.value}`);
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  const handleFilterNames = (event) => {
    console.log(event.target.value);
    setFilterValue(event.target.value);
  }

  return (
    <div>
      <Header text="Phonebook" />
      <div>
        Filter shown with: <input value={filterValue} onChange={handleFilterNames} />
      </div>
      {/* <div>debug: {newName}</div> */}
      <SubHeader text="Add a New" />
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <SubHeader text="Numbers" />
      <ul>
        { persons.filter(person => person.name.toLowerCase().includes(filterValue)).map(person =>           
          <Person key={person.name} person={person} />        
        )}
      </ul>
    </div>
  )
}

export default App