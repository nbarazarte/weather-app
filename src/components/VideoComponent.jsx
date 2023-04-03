import { useEffect } from 'react';

const VideoComponent = ({weather}) => {

useEffect(() => {

  let videoURL

  if (weather?.weather[0].description.includes('thunderstorm')){
    videoURL = '/video/thunderstorm.mp4'
  }

  if (weather?.weather[0].description.includes('drizzle')){
    videoURL = '/video/drizzle.mp4'
  }

  if (weather?.weather[0].description.includes('rain')){
    videoURL = '/video/rain.mp4'
  }

  if (weather?.weather[0].description.includes('sky')){
    videoURL = '/video/clear2.mp4'
  }

  if (weather?.weather[0].description.includes('clouds')){
    videoURL = '/video/clouds.mp4'
  }

  if (
      (weather?.weather[0].description === 'mist') ||
      (weather?.weather[0].description === 'smoke') ||
      (weather?.weather[0].description === 'haze') ||
      (weather?.weather[0].description === 'sand/dust whirls') ||
      (weather?.weather[0].description === 'fog') ||
      (weather?.weather[0].description === 'sand') ||
      (weather?.weather[0].description === 'dust') ||
      (weather?.weather[0].description === 'volcanic ash') ||
      (weather?.weather[0].description === 'squalls') ||
      (weather?.weather[0].description === 'tornado')
      ){
    videoURL = '/video/atmosphere.mp4'
  }
  
  document.getElementById('bgVideo').innerHTML = `<video autoPlay muted loop id="myVideo">      
  <source src=${videoURL} type="video/mp4"></source>
    Your browser does not support HTML5 video.
  </video>`

}, [weather])

  return (
    
    <div id='bgVideo'></div>
    
  )
}

export default VideoComponent