import { useState } from "react";

const WeatherCard = ({weather, temperature}) => {

    const [iscelsius, setIscelsius] = useState(true)
    const [timeh, setTimeh] = useState(0)
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

  return (

    <article className="weather">

        <header className="title">
            <h1>Weather App</h1>
        </header>

        <section className="location">
            <i class='bx bx-map'></i>
            <h3>{weather?.name}, {weather?.sys.country}</h3>
            
            <button className="changeLocation">
                <i class='bx bx-map-alt'></i>
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