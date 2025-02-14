import axios from 'axios'

const getWeatherOfCity = (city) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_KEY}`).then(response => response.data)
}

export default {getWeatherOfCity}