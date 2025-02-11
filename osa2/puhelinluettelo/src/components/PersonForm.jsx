import personAPI from '../services/persons'

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setSuccessMsg, setErrorMsg }) => {
  const createPerson = (person) => {
    personAPI.create(person).then(createdPerson => {
      setPersons(persons.concat(createdPerson))
      setNewName('')
      setNewNumber('')
      
      setSuccessMsg(`Added ${person.name}`)
      setTimeout(() => {
        setSuccessMsg(null)
      }, 2000)
    })
  }

  const updatePerson = (newPerson) => {
    const id = persons.find(p => p.name === newPerson.name).id

    personAPI.update(id, newPerson).then(returnedPerson => {
      setPersons(persons.map(p => p.id !== id ? p : returnedPerson))

      setSuccessMsg(`Updated ${newPerson.name}`)
      setTimeout(() => {
        setSuccessMsg(null)
      }, 2000)
    }).catch(error => {
      setErrorMsg(`Information of ${newPerson.name} has already been removed from the server`)
      setTimeout(() => {
        setErrorMsg(null)
      }, 2000)
    })

    setNewName('')
    setNewNumber('')
  }

  const addName = (event) => {
    event.preventDefault()

    const person = {
      name: newName,
      number: newNumber
    }

    if (persons.every(person => person.name != newName)) {
      createPerson(person)
    } else if (persons.find(p => p.name === person.name).number === '') { // no number yet
      updatePerson(person)
    } else if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
      updatePerson(person)
    }
  }

  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm