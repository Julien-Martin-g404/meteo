import Sun from '../Assets/sun.svg';
import '../Styles/Weather.css';
import Days from './Days.js';
import React, { useState, useEffect } from 'react';

function Weather() {

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=lyon&days=5&aqi=no&alerts=no`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setWeatherData(data))
    }, []);

    return (

        <div>
            {weatherData ? (
                <div class="weather card blue-grey darken-1">
                    <div class="card-content white-text">
                        <div class="card-title">{weatherData.location.name}</div>
                        <img src={Sun} class="App-logo" alt="logo2" />
                        <div class="temperature">{weatherData.current.temp_c} °C</div>
                        <div class="wind">Vent:  {weatherData.current.wind_kph} Km/h</div>
                    </div>

                    <Days />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>


        // <div class="weather card blue-grey darken-1">
        //     <div class="card-content white-text">
        //         <div class="card-title">{weatherData.location.name}</div>
        //         <img src={Sun} class="App-logo" alt="logo2" />
        //         <div class="temperature">{weatherData.current.temp_c}</div>
        //         <div class="wind">{weatherData.current.wind_kph}</div>
        //     </div>

        //     <Days />
        // </div>






    );
}

export default Weather