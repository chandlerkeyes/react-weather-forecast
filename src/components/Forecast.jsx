import axios from "axios";
import React, { useEffect, useState } from "react";


const Forecast = () => {
    const [coordinates, setCoordinates] = useState({ lat: null, long: null });
    const getCoordinates = async () => {
        return await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=Houston,TX,US&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`);
    };

    useEffect(() => {
        getCoordinates().then((response) => {
            const coordinateData = response.data[0];
            setCoordinates({ lat: coordinateData.lat, long: coordinateData.lon });
        }).catch((e) => {
            console.log("Could not fetch data from OpenWeatherMap API: ", e);
        });
    }, []);

    return <div>
        <h2>4-Day Forecast</h2>
        <div>Lat: {coordinates.lat}</div>
        <div>Long: {coordinates.long}</div>
    </div>;
}

export default Forecast;