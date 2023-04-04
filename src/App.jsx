import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import Loading from './components/Loading';
import Select from 'react-select'
import VideoComponent from './components/VideoComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPinLock,faCloudArrowDown, faHourglassStart } from '@fortawesome/free-solid-svg-icons'
function App() {

  const [hasError, setHasError] = useState(false)
  const [timeh, setTimeh] = useState(<FontAwesomeIcon icon={faHourglassStart} spin />)
  const [nowd, setNowd] = useState('')
  const [latlon, setLatlon] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [location, setLocation] = useState('')
  const [countries, setCountries] = useState()

  useEffect(() => {

/*      const options = [
      { value: 'Madrid', label: 'Madrid' },
      { value: 'London', label: 'London' },
      { value: 'Praga', label: 'Praga' },
      { value: 'Namibia', label: 'Namibia' },
      { value: 'Guinea', label: 'Guinea' },
      { value: 'Vanuatu', label: 'Vanuatu' },
      { value: 'France', label: 'France' },
      { value: 'Andorra', label: 'Andorra' },
      { value: 'Azerbaijan', label: 'Azerbaijan' },
      { value: 'Denmark', label: 'Denmark' },
      { value: 'Seattle', label: 'Seattle' },
    ]  */
    
    const url = `https://restcountries.com/v3.1/all`
    axios.get(url)
    .then(res => {
      //console.log(res.data.length);
      //console.log(res.data);

      let nameCountries = []
      let countries = res.data
      let obj = {}
      for (const x of countries) {
        //console.log(x.name.common);
        obj = {
          value: x.name.common,
          label: x.name.common,
        }
        nameCountries.push(obj)
      }
      
      setCountries(nameCountries)
      //console.log(nameCountries);
    })
    .catch(err => console.log(err))

    //setCountries(options)
  
  }, [])

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
      //console.log(err);
      setHasError(true)

/*       setTimeout(() => {
        setHasError(false)
      }, 5000) */
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }, [])

  useEffect(() => {
    
    if(latlon){

      const apikey = 'e7a1a2cfa98becafeefff6f39e6543e8'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${apikey}`

      axios.get(url)
      .then(res => {

        //console.log(res.data);

        const celsius = (res.data.main.temp - 273.15).toFixed(1)
        const farenheit = (celsius * 9/5 + 32).toFixed(1)

        const obj = {
          celsius, farenheit
        }
        setTemperature(obj)   
        setWeather(res.data)

        //Oculto el select de los paises:
        document.getElementById('divLocation').style.display = 'none'
        document.getElementById('currentLocation').style.display = 'inline'
        document.getElementById('searching').style.display = 'none'

      })
      .catch(err => console.log(err))
    }

  }, [latlon])

  const showTime = () => {

    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    //console.log(Intl.DateTimeFormat().resolvedOptions());

    options.timeZone = timezone//'UTC';//timezone//
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

  const handlerLocation = (e) => {
    setLocation(e.value)
  }

  useEffect(() => {
    
    if(location){
      document.getElementById('searching').style.display = 'inline'
      const apikey = 'e7a1a2cfa98becafeefff6f39e6543e8'
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apikey}`

      axios.get(url)
      .then(res => {
        //console.log(res.data[0].lat);
          const obj = {
            lat: res.data[0].lat,
            lon: res.data[0].lon,
          }
          setLatlon(obj)

        })
      .catch(err => console.log(err))
    }

  }, [location])

  return (

  <div>

    <VideoComponent weather={weather} />

    <div className="content">
      <div className="weather">
        {
          hasError 
          ? <p className='errormsg'>
              Se requieren permisos <FontAwesomeIcon icon={faLocationPinLock} beat /> <br/>
              Active la ubicación de su dispositivo
             </p>
          : 
          weather
          ?
          <>
            <header className="title">
                <h1>Weather App</h1>
            </header>
            <div id="searching">
              <FontAwesomeIcon icon={faCloudArrowDown} beat size='2xl'/>
            </div>
            <section className="location">
                
                <div id='currentLocation'>
                  <h3>
                      {weather?.name}, {weather?.sys.country} 
                  </h3>
                </div>            

                <div id='divLocation' >
                    <Select onChange={handlerLocation} className="selectLocation" options={countries} />
                </div>

                <button onClick={showSelectLocation} className="changeLocation">
                  <i className='bx bx-map'></i>
                </button>
            </section>  

            <section className="timeLocation">
                <h3>{nowd}</h3>
                <h3 className='time'>{timeh}</h3>
            </section>           
            <WeatherCard weather={weather} temperature={temperature}/> 
          </>
          : 
          <Loading/>
        }
      </div>
    </div>  
  </div>

  )
}

export default App
