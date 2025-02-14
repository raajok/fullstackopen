import {useState, useEffect} from 'react'
import countriesAPI from '../services/restcountries'
import Weather from './Weather'

const Country = ({name}) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
      countriesAPI.getCountry(name)
        .then(data => {
          const newCountry = {
            name: data.name.common,
            capital: data.capital[0],
            area: data.area,
            languages: Object.values(data.languages),
            flag: data.flags.png
          }
          setCountry(newCountry)
        })
        .catch(error => {
          console.log('Error fetching country:', error)
        })
    }, [])
  
  if (country) {
    
  }
  return (
    <div>
      {country ? (
        <div>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
          <h2>languages:</h2>
          <ul>
            {country.languages.map(language => <li key={language}>{language}</li>)}
          </ul>
          <img src={country.flag} />
          <Weather city={country.capital} />
        </div>
      ) : null}
    </div>
  )
}

export default Country