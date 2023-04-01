import { useEffect, useRef, useState } from 'react';
import './App.css'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import Loading from './components/Loading';

function App() {

const [latlon, setLatlon] = useState()
const [weather, setWeather] = useState()
const [temperature, setTemperature] = useState()

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

//console.log(wheather);

  return (

  <div>
    <video autoPlay muted loop id="myVideo">
      <source src='https://cdn.pixabay.com/vimeo/806571973/atardecer-153976.mp4?width=1920&expiry=1680371427&hash=cdc6d22ad3130320c0278f6ea4c44b28fcb8b7ba' type="video/mp4"></source>
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
