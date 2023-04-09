import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import Loading from './components/Loading';
import Select from 'react-select'
import VideoComponent from './components/VideoComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPinLock,faCloudArrowDown, faHourglassStart } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from '@chakra-ui/tooltip';

function App() {

  const [hasError, setHasError] = useState(false)
  const [timeh, setTimeh] = useState(<FontAwesomeIcon icon={faHourglassStart} spin />)
  const [nowd, setNowd] = useState('')
  const [latlon, setLatlon] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [idciudad, setIdciudad] = useState()
  const [cities, setCities] = useState('')
  const [citiesresults, setCitiesresults] = useState()

  // 1 Establece la latitud y longitud al inicio 
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

      /*setTimeout(() => {
        setHasError(false)
      }, 5000) */
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }, [])

  // 2 Busca los datos del clima en la latitud y longitud establecida
  useEffect(() => {
    
    if(latlon){
      
      const apikey = import.meta.env.VITE_API_WEATHER;
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
        setCitiesresults('')
        document.getElementById('myInput').value = ''
      })
      .catch(err => console.log(err))
    }

  }, [latlon])

  // 3 Muestra el selector de una nueva Ciudad
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

  // 4 Recibe el nombre de una ciudad
  const handleCities = (e) => {
    setCities(e.target.value)
  }

  // 5 Busca las Ciudades que coincidan con lo escrito por el usuario
  useEffect(() => {

    //console.log(cities);
    const api = import.meta.env.VITE_API_GOOGLE;
    const urlcors = 'https://cors.eu.org/';
    const url = `${urlcors}https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${cities}&types=geocode&key=${api}`
    
    axios.get(url)
    .then(res => {

      setCitiesresults(res.data.predictions)

    })
    .catch(err => {
      console.log(err);
    }); 

  }, [cities])

  // 5.1 Muestra las Ciudades que coincidan con lo escrito por el usuario
  const CitiesList = () => (
    <>
      {
        citiesresults ?
        <ul id="citiesList">
          {
            citiesresults.map(item => (
              <li className="optionsList" key={item.place_id} onClick={ e => handlerSelectCity(e,item.place_id)}>
                <div>{item.description}</div>
              </li>
            ))
          }
        </ul>
        : ''
      }
    </>
  );

// 6 Selecciona una Ciudad  
  const handlerSelectCity = (e,key) => {
    //console.log(e.target );
    //console.log(key);
    setIdciudad(key)
    showSelectLocation();
}  

// 6.1 Busca la nueva latitud y longitud del id de la Ciudad y retornamos al paso 2
useEffect(() => {
  //console.log(idciudad);
  const api = import.meta.env.VITE_API_GOOGLE;
  const urlcors = 'https://cors.eu.org/';
  const url = `${urlcors}https://maps.googleapis.com/maps/api/place/details/json?place_id=${idciudad}&fields=name%2Crating%2Cgeometry&key=${api}`

  axios.get(url)
  .then(res => {

    //console.log(res.data.result.geometry.location);
    const obj = {
      lat: res.data.result.geometry.location.lat,
      lon: res.data.result.geometry.location.lng,
    }

    document.getElementById('searching').style.display = 'inline'
    setTimeout(() => {
      setLatlon(obj)
    }, 2000);
    
  })
  .catch(err => {
    console.log(err);
  }); 

}, [idciudad])

// Muestra la hora y la fecha
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

  return (
    <div>
      <VideoComponent weather={weather} />
      {
        hasError
        ? 
          <div className="errorDiv">
              <header className="title">
                <h1>Weather App</h1>
              </header>
            <p className='errormsg'>
              Permits are required <FontAwesomeIcon icon={faLocationPinLock} beat style={{color: "#ed0c39",}}/> <br/>              
              Activate the location of your device
            </p>
          </div>
        : 
        weather
        ? <div className="content">
          
            <div className="weather">              

              <header className="title">
                <h1>Weather App</h1>
                <img src='/weather.svg'/>
              </header>
              
              <div id="searching">
                <FontAwesomeIcon icon={faCloudArrowDown} beat size='2xl'/>
                <p>Looking for new weather data</p>
              </div>
              
              
              <section className="location">

                <div id='currentLocation'>
                  <h3>
                    {weather?.name}, {weather?.sys.country} 
                  </h3>
                </div>            

                <div id='divLocation' >
                  <div className="locationContent">
                    <label>
                      <input className='myInput' id="myInput" name="myInput" defaultValue="" placeholder='Search any city' onChange={handleCities} />
                    </label>
                    <CitiesList />                    
                  </div>               
                </div>

                <Tooltip label="Change location" placement='top-end'>
                  <button onClick={showSelectLocation} className="changeLocation">
                    <i className='bx bx-map'></i>
                  </button>
                </Tooltip>

              </section>  

              <section className="timeLocation">
                  <h3>{nowd}</h3>
                  <h3 className='time'>{timeh}</h3>
              </section>

              
              <WeatherCard weather={weather} temperature={temperature}/>
              

              <Tooltip label="Go to my Github" placement='auto-start'>
                <a href='https://github.com/nbarazarte/weather-app' target='_blank'>
                  <i className='bx bxl-github'></i>
                </a>
              </Tooltip>

            </div>

          </div> 
        : 
        <Loading/>
      }
    </div>
  )
}

export default App
