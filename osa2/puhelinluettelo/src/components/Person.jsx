import personAPI from '../services/persons'

const Person = ({ person, persons, setPersons, setSuccessMsg }) => {
  const deletePerson = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personAPI.deleteObject(person.id).then(response => {
        setPersons(persons.filter(p => p.id !== person.id))

        setSuccessMsg(`Deleted ${person.name}`)
        setTimeout(() => {
          setSuccessMsg(null)
        }, 2000)
      })
    }
  }

  return (
    <div>
      <p>{person.name} {person.number}</p>
      <button onClick={deletePerson}>delete</button>
    </div>
  )
}

export default Person