import {useState, useEffect} from 'react'
import countriesAPI from '../services/restcountries'

const FilteredCountries = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    countriesAPI.getAll()
      .then(allCountries => {
        setCountries(allCountries.map(country => country.name.common))
      })
      .catch(error => {
        console.log('Error fetching countries:', error)
      })
  }, [])

  const handleSearch = (event) => {
    const newCountry = event.target.value
    setSearch(newCountry)
    setFilteredCountries(countries.filter(country => country.toLowerCase().includes(newCountry.toLowerCase())))
  }

  return (
    <div>
      find countries <input value={search} onChange={event => handleSearch(event)} />
    </div>
  )
}

export default FilteredCountries