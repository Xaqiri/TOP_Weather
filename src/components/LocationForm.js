import React, { useState } from "react";
import WeatherDisplay from "./WeatherDisplay.js";
import "./styles/LocationForm.css";

const LocationForm = (props) => {
    const [city, setCity] = useState("Chicago");
    const [temp, setTemp] = useState(0);
    const [displayWeather, setDisplayWeather] = useState(false);
    const getWeatherData = () => { 
        const input = document.getElementById("input");
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input.value}&APPID=${props.api_key}`, {mode: 'cors' })
        .then(response => response.json())
        .then(json => {
            setCity(json.name);
            setTemp(json.main.temp);
            setDisplayWeather(true);
        })
        .catch(err => {
            console.log(err);
            setDisplayWeather(false);
        })
    }
    
    return (
        <div id="location-form-container">
            <div id="location-info">
                <div>Search for a city:</div>
                <input type="text" id="input"></input>
                <button type="button" onClick={getWeatherData}>Submit</button>
                <button>Use Current Position</button>
            </div>
            <div id="weather-display">
                {displayWeather && <WeatherDisplay city={city} temp={temp}/>}
            </div>
        </div>
    );
};

export default LocationForm;