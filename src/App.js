import React from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from './components/weather';
import Search from './components/search';

import Sunny from './img/sunny.jpg';
import Night from './img/night.jpg';
import Rainy from './img/rainy.jpg';
import Snowy from './img/snowy.jpg';
import Sunset from './img/sunset.jpg';
import Stormy_Night from './img/stormy.jpg';
import Stormy_Day from './img/storm-day.jpg';
import Night_Rain from './img/night-rain.jpg';
import Snowy_Night from './img/snow-night.jpg';


const api_key = '8d0e8496bd923c4580b2ea219d71e470';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      localtime: undefined,
      timezone: undefined,
      temperature: undefined,
      temp_in_fahrenheit: undefined,
      feelslike: undefined,
      precip: undefined,
      humidity: undefined,
      weather_icon: undefined,
      weather_description: "",
      error: false,
      backgroundStyle: {
        backgroundImage: undefined,
        backgroundColor: 'black',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }
    };
  }

  changeBackground(time, description) {
    // Check for rain
    if (description.includes('shower') || description.includes('rain')) {
      if (time >= 20 || (time >= 0 && time < 7)) {
        this.setState({
          backgroundStyle: {
            backgroundImage: 'url('+Night_Rain+')'
          }
        });
      } else if (time > 7 && time < 20) {
        this.setState({
          backgroundStyle: {
            backgroundImage: 'url('+Rainy+')'
          }
        });
      } else {
        this.setState({
          backgroundStyle: {
            backgroundImage: 'url('+Rainy+')'
          }
        });
      }
    }
    // Check for clear sky/sunny
    else if (description.includes('sunny') || description.includes('clear')) {
      if (time >= 20 || (time >= 0 && time < 7)) {
        this.setState({
          backgroundStyle: {
            backgroundImage: 'url('+Night+')'
          }
        });
      } else if (time > 7 && time < 20) {
        this.setState({
          backgroundStyle: {
            backgroundImage: 'url('+Sunny+')'
          }
        });
      } else {
        this.setState({
          backgroundStyle: {
            backgroundImage: 'url('+Sunny+')'
          }
        });
      }
    }
    // Check for snow
    else if (description.includes('snow') || description.includes('sleet')) {
      if (time >= 20 || (time >= 0 && time < 7)) {
        this.setState({
          backgroundStyle: {
            backgroundImage: 'url('+Snowy_Night+')'
          }
        });
      } else if (time > 7 && time < 20) {
        this.setState({
          backgroundStyle: {
            backgroundImage: 'url('+Snowy+')'
          }
        });
      } else {
        this.setState({
          backgroundStyle: {
            backgroundImage: 'url('+Snowy+')'
          }
        });
      }
    }
    // Check for storm
    else if (description.includes('storm')) {
      if (time >= 20 || (time >= 0 && time < 7)) {
        this.setState({
          backgroundStyle: {
            backgroundImage: 'url('+Stormy_Night+')'
          }
        });
      } else if (time > 7 && time < 20) {
        this.setState({
          backgroundStyle: {
            backgroundImage: 'url('+Stormy_Day+')'
          }
        });
      } else {
        this.setState({
          backgroundStyle: {
            backgroundImage: 'url('+Stormy_Day+')'
          }
        });
      }
    } 
    // No condition - default
    else {
      if (time >= 20 || (time >= 0 && time < 7)) {
        this.setState({
          backgroundStyle: {
            backgroundImage: 'url('+Night+')'
          }
        });
      } else if (time > 7 && time < 17) {
        this.setState({
          backgroundStyle: {
            backgroundImage: 'url('+Sunny+')'
          }
        });
      } else {
        this.setState({
          backgroundStyle: {
            backgroundImage: 'url('+Sunset+')'
          }
        });
      }
    }
  }

  convertToFahrenheit(temp) {
    let fahrenheit = Math.floor((temp * 1.8) + 32);
    this.setState({
      temp_in_fahrenheit: fahrenheit
    });
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;

    if(city) {
      const api_call = await fetch(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`);
      const response = await api_call.json();

      console.log(response);

      this.setState({
        city: `${response.location.name}, ${response.location.region}`,
        country: response.location.country,
        localtime: response.location.localtime,
        temperature: response.current.temperature,
        feelslike: response.current.feelslike,
        precip: response.current.precip,
        humidity: response.current.humidity,
        weather_icon: response.current.weather_icons,
        weather_description: response.current.weather_descriptions
      });

      const t = this.state.localtime.slice(11, 13);
      const time = parseInt(t);
      const temp = parseInt(this.state.temperature);
      const description = this.state.weather_description;

      this.changeBackground(time, description);
      this.convertToFahrenheit(temp);

    } else {
      this.setState({
        error: true
      });
    }
  };



  render() {
    return (
      <div className="App" style={this.state.backgroundStyle}>
        <Search 
          search={this.getWeather} 
          error={this.state.error} 
        />
        <Weather 
          city={this.state.city} 
          country={this.state.country}
          localtime={this.state.localtime}
          temperature={this.state.temperature}
          temp_in_fahrenheit={this.state.temp_in_fahrenheit}
          feelslike={this.state.feelslike}
          onclick={this.state.handleClick}
          precip = {this.state.precip}
          humidity = {this.state.humidity}
          weather_icon = {this.state.weather_icon}
          weather_description = {this.state.weather_description} 
        />
      </div>
    );
  }
}

export default App;