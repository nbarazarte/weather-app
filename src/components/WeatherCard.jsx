import { useEffect, useState } from "react";

const WeatherCard = ({weather, temperature}) => {

    const [iscelsius, setIscelsius] = useState(true)
    const [titleweather, setTitleweather] = useState()
    //console.log(weather);
    //console.log(weather?.weather[0].description);
    //console.log(temperature);

    const handlerChangeTemperature = () => {
        setIscelsius(!iscelsius)
    }

    useEffect(() => {

        let text = weather?.weather[0].description
        let stateWheather = []
        let scondWord = ''
        let title = ''

        for (const x of text.split(' ')) {
          text = x.split('')
          text = text[0].toUpperCase() + text.splice(1).join('')
          stateWheather.push(text)
          //console.log(text)
        }
        
        if(stateWheather[1]){
            scondWord = stateWheather[1]
        }
        
        title = `${stateWheather[0]} ${scondWord}`

        //console.log(title)
        setTitleweather(title)

    }, [temperature])
    
  return (

    <article className="weatherCard">

        <section className="iconWewather">
            <div  className="icon_temperature">
                <img className="iconWeather" src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} />
                <article>
                    <h1 className="temperature">
                    <i className='bx bxs-thermometer'></i>                                         
                        {
                            iscelsius
                            ? `${temperature?.celsius} °C`
                            : `${temperature?.farenheit} °F`
                        }
                        
                    </h1>
                </article>
            </div>            
            <h1>
                {titleweather}
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