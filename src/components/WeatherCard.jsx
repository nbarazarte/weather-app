import { useState } from "react";

const WeatherCard = ({weather, temperature}) => {

    const [iscelsius, setIscelsius] = useState(true)
    console.log(weather);
    //console.log(wheather?.wheather[0].description);
    //console.log(temperature);

    const handlerChangeTemperature = () => {
        setIscelsius(!iscelsius)
    }

  return (

    <article className="weather">
        <h1>Weather App</h1>
        <h2>{weather?.name}, {weather?.sys.country}</h2>

        <section>
            <header>
                <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} />
            </header>
        </section>

        <section>
            
            <article>
                <h3>{weather?.weather[0].description}</h3>
                <ul>
                    <li><span>Wind Speed: </span>{weather?.wind.speed} m/s</li>
                    <li><span>Clouds: </span>{weather?.clouds.all} %</li>
                    <li><span>Pressure:</span>{weather?.main.pressure} hPa</li>
                </ul>
            </article>
        </section>
        <footer>
            <h2>
                {
                    iscelsius
                    ? `${temperature?.celsius} C`
                    : `${temperature?.farenheit} F`
                }
            </h2>
        </footer>
        <button onClick={handlerChangeTemperature}>Change to {iscelsius ? 'F' : 'C'}</button>
    </article>
  )
}

export default WeatherCard