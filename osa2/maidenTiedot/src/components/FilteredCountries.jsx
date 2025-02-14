import {useState, useEffect} from 'react'
import countriesAPI from '../services/restcountries'
import CountryFilter from './CountryFilter'
import Country from './Country'

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

  if (filteredCountries.length > 10 || filteredCountries.length == 0) {
    return (
      <div>
        <CountryFilter search={search} handleSearch={handleSearch} />
        <div>Too many matches, specify another filter</div>
      </div>
    )
  } else if (filteredCountries.length > 1) {
    return (
      <div>
        <CountryFilter search={search} handleSearch={handleSearch} />
        {filteredCountries.map(country => <div key={country}>
          {country} <button onClick={() => setFilteredCountries([country])}>show</button>
        </div>)}
      </div>
    )
  } else {
    return (
      <div>
        <CountryFilter search={search} handleSearch={handleSearch} />
        <Country name={filteredCountries[0]} />
      </div>
    )
  }
}

export default FilteredCountries