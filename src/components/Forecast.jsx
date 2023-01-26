import axios from "axios";
import React, { useEffect, useState } from "react";


const Forecast = () => {
    const [coordinates, setCoordinates] = useState({ lat: null, long: null });
    const getCoordinates = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_OPEN_WEATHER_API_HOST}/geo/1.0/direct?q=Houston,TX,US&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`);
            setCoordinates({ lat: response.data[0].lat, long: response.data[0].lon });
        } catch (e) {
            console.error("Could not fetch coordinates from OpenWeatherMap API: ", e);
        }
    };

    const get4DayForecast = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_OPEN_WEATHER_API_HOST}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.long}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`);
            console.log("WEATHER: ", response.data);
        } catch (e) {
            console.error("Could not fetch 4 Day Forecast from OpenWeatherMap API: ", e);
        }
    };

    useEffect(() => {
        getCoordinates();
    }, []);

    return <div>
        <h2>4-Day Forecast</h2>
        <div>Lat: {coordinates.lat}</div>
        <div>Long: {coordinates.long}</div>
        <button onClick={get4DayForecast}>Get Weather</button>
    </div>;
}

export default Forecast;