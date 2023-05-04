import React, { useState, useEffect } from 'react';
import '../Styles/Weather.css';
import Days from './Days.js';

function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [activeDay, setActiveDay] = useState(0);
    const [city, setCity] = useState(''); // Valeur initiale vide pour la ville

    useEffect(() => {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        let apiUrl;

        if (city === '') { // Si la ville est vide, on utilise la géolocalisation
            navigator.geolocation.getCurrentPosition((position) => {
                apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${position.coords.latitude},${position.coords.longitude}&days=5&aqi=no&alerts=no`;
                fetch(apiUrl)
                    .then((response) => response.json())
                    .then((data) => setWeatherData(data))
                    .catch((error) => console.error(`Error fetching weather data: ${error}`));
            });
        } else { // Sinon, on utilise la ville saisie par l'utilisateur
            apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`;
            fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => setWeatherData(data))
                .catch((error) => console.error(`Error fetching weather data: ${error}`));
        }
    }, [city]);

    const handleDayClick = (index) => {
        setActiveDay(index);
    };

    const currentDay = new Date().getDay();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCity = e.target.elements.city.value;
        setCity(newCity);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="city">Enter city name :</label>
                <input type="text" id="city" name="city" defaultValue={city} />
                <button type="submit">Submit</button>
            </form>
            {weatherData ? (
                <div className="weather card blue-grey darken-1">
                    <div className="card-content white-text">
                        <div className="card-title">{weatherData.location.name}</div>
                        <img
                            src={weatherData.current.condition.icon}
                            className="App-logo"
                            alt="logo2"
                        />
                        <div className="temperature">
                            {activeDay === 0
                                ? weatherData.current.temp_c
                                : weatherData.forecast.forecastday[activeDay].day.avgtemp_c}{' '}
                            °C
                        </div>
                        <div className="wind">
                            Vent:{' '}
                            {activeDay === 0
                                ? weatherData.current.wind_kph
                                : weatherData.forecast.forecastday[activeDay].day.maxwind_kph}{' '}
                            Km/h (
                            {activeDay === 0
                                ? weatherData.current.wind_degree
                                : weatherData.forecast.forecastday[activeDay].day.wind_degree}
                            °)
                        </div>
                    </div>
                    <Days
                        handleDayClick={handleDayClick}
                        currentDay={currentDay}
                        activeDay={activeDay}
                    />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

}

export default Weather;
