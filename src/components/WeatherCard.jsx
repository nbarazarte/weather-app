import { useState } from "react";
import Select from 'react-select'
const WeatherCard = ({weather, temperature}) => {


    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    const [iscelsius, setIscelsius] = useState(true)
    const [timeh, setTimeh] = useState('loading...')
    const [nowd, setNowd] = useState('')

    //console.log(weather);
    //console.log(weather?.weather[0].description);
    //console.log(temperature);

    const handlerChangeTemperature = () => {
        setIscelsius(!iscelsius)
    }

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

    <article className="weather">

        <header className="title">
            <h1>Weather App</h1>
        </header>

        <section className="location">
            
            <h3 id='currentLocation'>
                {weather?.name}, {weather?.sys.country}
            </h3>

            <div id='divLocation' >
                <Select className="selectLocation" options={options} />
            </div>

            <button onClick={showSelectLocation} className="changeLocation">
                <i class='bx bx-map'></i>
            </button>
        </section>  

        <section className="timeLocation">

            <h3>{nowd}</h3>
            <h3>{timeh}</h3>
            
        </section>          

        <section className="iconWewather">
            <div  className="icon_temperature">
                <img className="iconWeather" src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} />
                <article>
                    <h1 className="temperature">
                    <i class='bx bxs-thermometer'></i>
                        {
                            iscelsius
                            ? `${temperature?.celsius} °C`
                            : `${temperature?.farenheit} °F`
                        }
                    </h1>
                </article>
            </div>            
            <h1>
                {weather?.weather[0].description}
            </h1>            
            
        </section>

        <section className="info">

            <article>
                <ul>
                    <li><span>Wind Speed: </span>{weather?.wind.speed} m/s</li>
                    <li><span>Clouds: </span>{weather?.clouds.all} %</li>
                    <li><span>Pressure:</span>{weather?.main.pressure} hPa</li>
                </ul>
            </article>



        </section>

        <button onClick={handlerChangeTemperature}>Change to {iscelsius ? '°F' : '°C'}</button>
    </article>
  )
}

export default WeatherCard