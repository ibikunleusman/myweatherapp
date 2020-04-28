import './animate.css';
import React from "react";

const Weather = (props) => {
    return (
        <div className="container d-flex justify-content-center text-light" >
            <div className="weather-cards">
                <h2>{props.city}</h2>
                <h2>{props.country}</h2>
                <h5 className="date-time">{props.localtime}</h5>
                <h5 className="py-4">
                    <img src={props.weather_icon} alt={props.weather_description}/>
                </h5>
                
                {props.temperature ? (<h1 className="py-2">
                    {props.temperature}&deg;C/ {props.temp_in_fahrenheit}&deg;F
                </h1>) : null}

                {precipHumidity(props.precip, props.humidity)}
                {props.feelslike ? (<p>Feels like: {props.feelslike}&deg;C</p>) : null}
                <br></br>
                <h4 className="weather-condition pb-3 mb-3">{props.weather_description}</h4>
            </div>
        </div>
    );
};

function precipHumidity(p,h) {
    if (p >= 0 && h) {
        return (
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <h5 className="px-4">Humidity: {h}</h5>
                </div>
                <div className="row d-flex justify-content-center">
                    <h5 className="px-4">Precipitation: {p}</h5>
                </div>
            </div>
        );
    }
}

export default Weather;