import { useEffect, useRef, useState } from 'react';
import './App.css'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import Loading from './components/Loading';
import Select from 'react-select'
import 'boxicons'

function App() {

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const [timeh, setTimeh] = useState('loading...')
  const [nowd, setNowd] = useState('')

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

    //const url2 = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apikey}`

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
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'sand/dust whirls':
    case 'fog':
    case 'sand':
    case 'dust':
    case 'volcanic ash':
    case 'squalls':
    case 'tornado':
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


const showTime = () => {

  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  options.timeZone = timezone//'UTC';
  //options.timeZoneName = 'short';
  //const now = today.toLocaleString('en-US', options);
  //const nowH = today.toLocaleTimeString('en-US');

  setNowd(today.toLocaleString('en-US', options))

  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";
  
  if(h == 0){
      h = 12;
  }
  
  if(h > 12){
      h = h - 12;
      session = "PM";
  }
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  
  var time = h + ":" + m + ":" + s + " " + session;
  setTimeh(time); 
}

setTimeout(showTime, 1000);

const showSelectLocation = () => {
  
  let element = document.getElementById('divLocation').style.display
  if (element === 'inline') {
      document.getElementById('divLocation').style.display = 'none'
      document.getElementById('currentLocation').style.display = 'inline'
      
  }else{
      document.getElementById('divLocation').style.display = 'inline'
      document.getElementById('currentLocation').style.display = 'none'
  }

}

  return (

  <div>
    <video autoPlay muted loop id="myVideo">
      {bgvideo}
      Your browser does not support HTML5 video.
    </video>

    <div className="content">
      <div className="weather">

        {
          weather
          ?
          <>
            <header className="title">
                <h1>Weather App</h1>
            </header>

            <section className="location">
                
                <div id='currentLocation'>
                  <h3>
                      {weather?.name}, {weather?.sys.country}
                  </h3>
                </div>            

                <div id='divLocation' >
                    <Select className="selectLocation" options={options} />
                </div>

                <button onClick={showSelectLocation} className="changeLocation">
                  <i className='bx bx-map'></i>
                </button>
            </section>  

            <section className="timeLocation">
                <h3>{nowd}</h3>
                <h3>{timeh}</h3>
            </section>           
            <WeatherCard weather={weather} temperature={temperature}/> 
          </>
          : <Loading/>
        }
      </div>
    </div>  
  </div>

  )
}

export default App
