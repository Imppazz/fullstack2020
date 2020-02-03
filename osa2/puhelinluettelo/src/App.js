import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState()

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    const added = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (!added) {
      event.preventDefault()
      const nameObject = {
        name: newName,
        number: newNumber
      }
      personService.create(nameObject).then(returnValue => {
        setPersons(persons.concat(returnValue))
        setNewName('')
        setNewNumber('')
      })
      setMessageType(1)
      setErrorMessage(
        `${newName} was added`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else {
      event.preventDefault()
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const nameObject = {
          name: newName,
          number: newNumber
        }
        personService
          .update(person.id, nameObject).then(returnValue => {
            setPersons(persons.map(personnel => person.id !== personnel.id ? personnel : returnValue))
            setMessageType(1)
            setErrorMessage(
              `${newName} was updated`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }).catch(error => {
            setMessageType(2)
            setErrorMessage(
              `Person '${person.name}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(personnel => personnel.id !== person.id))
          })
      }

    }
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.del(id).then(returnValue => {
        setPersons(persons.filter(person => person.id !== id))
        setMessageType(1)
        setErrorMessage(
          `${person.name} was deleted`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }).catch(error => {
        setMessageType(2)
        setErrorMessage(
          `Note '${person.name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Notification message={errorMessage} id={messageType} />
      <h1>Phonebook</h1>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        deletePerson={deletePerson}
      />
    </div>
  )

}


export default App