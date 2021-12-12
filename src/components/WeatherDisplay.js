import React, { useState, useEffect } from "react";
import "./styles/WeatherDisplay.css";

const WeatherDisplay = (props) => {
    const [tempScale, setTempScale] = useState('k');
    const [tempC, setTempC] = useState(0) ;
    const [tempF, setTempF] = useState(32);

    useEffect (() => {
        setTempC(Math.floor(props.temp - 273.15))
        setTempF(Math.floor((props.temp - 273.15)*(9/5)+32))
        setTempScale('f')
    }, [props.temp]);

    const changeTemp = () => {
        if (tempScale === 'c') {
            setTempScale('f')
        } else {
            setTempScale('c')
        }
    }

    const getTemp = () => {
        if (tempScale === 'c') return tempC
        else return tempF
    }

    return (
        <div id="weather-display-container">
            <div id="location-display">{props.city}</div>
            <div id="temp-display">
                <div id="temp">
                    {getTemp(tempScale)}
                </div>
                <div id="temp-button" onClick={changeTemp}>{tempScale.toUpperCase()}</div>
            </div>
        </div>
    );
};

export default WeatherDisplay;