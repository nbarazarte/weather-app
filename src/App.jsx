import { useEffect, useRef, useState } from 'react';
import './App.css'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import Loading from './components/Loading';

import 'boxicons'

function App() {

const [latlon, setLatlon] = useState()
const [weather, setWeather] = useState()
const [temperature, setTemperature] = useState()
const [bgvideo, setBgvideo] = useState()

useEffect(() => {

  const success = pos => {
    //console.log(pos.coords);
    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    }
    setLatlon(obj)
  }
  
  const error = err => {
    console.log(err);
  }
  navigator.geolocation.getCurrentPosition(success, error);
}, [])

useEffect(() => {
  
  if(latlon){

    const apikey = 'e7a1a2cfa98becafeefff6f39e6543e8'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${apikey}`
    axios.get(url)
    .then(res => {

      const celsius = (res.data.main.temp - 273.15).toFixed(1)
      const farenheit = (celsius * 9/5 + 32).toFixed(1)
      //console.log(celsius.toFixed(1) + '--'+farenheit.toFixed(1));
      const obj = {
        celsius, farenheit
      }
      setTemperature(obj)   
      //setTemperature({celsius, farenheit})   
      setWeather(res.data)
      })
    .catch(err => console.log(err))

  }

}, [latlon])

useEffect(() => {
  
  const typeWeather = weather?.weather[0].description

  switch (typeWeather) {//typeWeather

    //Thunderstorm
    case 'thunderstorm with light rain':
    case 'thunderstorm with rain':
    case 'thunderstorm with heavy rain':
    case 'light thunderstorm':
    case 'thunderstorm':
    case 'heavy thunderstorm':
    case 'ragged thunderstorm':
    case 'thunderstorm with light drizzle':
    case 'thunderstorm with drizzle':
    case 'thunderstorm with heavy drizzle':
      setBgvideo(<source src='/video/thunderstorm.mp4'  type="video/mp4"></source>)
    break;

    //Drizzle
    case 'light intensity drizzle':
    case 'drizzle':
    case 'heavy intensity drizzle':
    case 'light intensity drizzle rain':
    case 'drizzle rain':
    case 'heavy intensity drizzle rain':
    case 'shower rain and drizzle':
    case 'heavy shower rain and drizzle':
    case 'shower drizzle':
      setBgvideo(<source src='/video/drizzle.mp4'  type="video/mp4"></source>)
    break;

    //Rain
    case 'light rain':
    case 'moderate rain':
    case 'heavy intensity rain':
    case 'very heavy rain':
    case 'extreme rain':
    case 'freezing rain':
    case 'light intensity shower rain':
    case 'shower rain':
    case 'heavy intensity shower rain':
    case 'ragged shower rain':
      setBgvideo(<source src='/video/rain.mp4'  type="video/mp4"></source>)
    break;
    
    //Snow
    case 'light snow':
    case 'snow':
    case 'heavy snow':
    case 'sleet':
    case 'light shower sleet':
    case 'shower sleet':
    case 'light rain and snow':
    case 'rain and snow':
    case 'light shower snow':
    case 'shower snow':
    case 'heavy shower snow':
      setBgvideo(<source src='/video/snow.mp4'  type="video/mp4"></source>)
    break;

    //Atmosphere
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Dust':
    case 'Fog	fog':
    case 'Sand':
    case 'Dust':
    case 'Ash':
    case 'Squall':
    case 'Tornado':
      setBgvideo(<source src='/video/atmosphere.mp4'  type="video/mp4"></source>)
    break;

    //Clear
    case 'clear sky':    
      setBgvideo(<source src='/video/clear2.mp4'  type="video/mp4"></source>)    
    break;
    
    //Clouds
    case 'few clouds':
    case 'scattered clouds':
    case 'broken clouds':
    case 'overcast clouds':  
      setBgvideo(<source src='/video/clouds.mp4'  type="video/mp4"></source>)    
    break;    
  } 

}, [weather])

  return (

  <div>
    <video autoPlay muted loop id="myVideo">
      {bgvideo}
      Your browser does not support HTML5 video.
    </video>

    <div className="content">
      <div className="App">
        {
          weather
          ? <WeatherCard weather={weather} temperature={temperature}/> 
          : <Loading/>
        }
      </div>
    </div>  
  </div>

  )
}

export default App
