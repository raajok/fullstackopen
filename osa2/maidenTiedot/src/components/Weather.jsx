import {useState, useEffect} from 'react'
import WeatherAPI from '../services/openWeather'

const Weather = ({city}) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    WeatherAPI.getWeatherOfCity(city).then(data => {
      const newWeatherData = {
        temperature: `temperature ${(data.main.temp - 273.15).toFixed(2)} Celsius`,
        wind: `wind ${data.wind.speed} m/s`,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      }
      setWeatherData(newWeatherData)
    })
  }, [])
  
  return (
    <div>
    {weatherData ? 
      <div>
        <h2>Weather in {city}</h2>
        <p>{weatherData.temperature}</p>
        <img src={weatherData.icon} />
        <p>{weatherData.wind}</p>
      </div> 
      : null
    }
    </div>
  )
}

export default Weather