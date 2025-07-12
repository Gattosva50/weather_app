import React, { useEffect, useRef, useState } from 'react';
import "./Weather.css";


const icons= {
  /*clear:"https://cdn-icons-png.flaticon.com/128/6974/6974827.png",
  cloud:"	https://cdn-icons-png.flaticon.com/128/414/414825.png",
  drizzle:"https://cdn-icons-png.flaticon.com/128/7084/7084489.png",
  rain:"https://cdn-icons-png.flaticon.com/128/3351/3351979.png",
  snow:"https://cdn-icons-png.flaticon.com/128/2315/2315377.png",*/
  humidity:"	https://cdn-icons-png.flaticon.com/128/2828/2828582.png",
  wind:"https://cdn-icons-png.flaticon.com/128/2676/2676053.png"
}

const Weather = () => {
  const [weatherData, setWeatherData]= useState(false)
  const inputRef = useRef()

  const search = async (city)=>{
    if (city ===""){
      alert('Enter City name');
      return;
    }
    try {
      const api = process.env.REACT_APP_API;
      
      const url = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${city}&aqi=no`;

      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert(data.error.message)
        return;
      }
      console.log(data);
      setWeatherData({
        humidity : data.current.humidity,
        wind : data.current.wind_kph,
        temp: Math.floor(data.current.temp_c),
        name:data.location.name,
        icon:data.current.condition.icon
      })
      
    } catch (error) {
      setWeatherData(false)
      console.error('Error in fetching weather data');
      
    }
  }

  useEffect(()=>{ 
    search("London");
  },[])
  
  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src="https://cdn-icons-png.flaticon.com/128/54/54481.png" alt="search icon" onClick={()=>search(inputRef.current.value)}/>
      </div>

      {weatherData?<>
        <img src={weatherData.icon} alt="" className='weather-icon' />
        <p className='temperature'> {weatherData.temp}°C </p>
        <p className='location'> <span>{weatherData.name}</span> </p>

        <div className="weather-data">
          <div className="col">
            <img src={icons.humidity} alt='humidity icon'/>
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>

          <div className="col">
            <img src={icons.wind} alt='wind icon' />
            <div>
              <p>{weatherData.wind} Km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>

        </div>
      </>:<> </>}
        
      </div>
  )
}

export default Weather
