import Person from './Person'

const Persons = ({ persons, setPersons, filter, setSuccessMsg }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      {filteredPersons.map(person => <Person key={person.name} person={person} persons={persons} setPersons={setPersons} setSuccessMsg={setSuccessMsg} />)}
    </div>
  )
}

export default Persons