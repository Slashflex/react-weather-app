import React from 'react';
import Form from "./components/form/form.component";
import Weather from "./components/weather/weather.component";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

// git project https://github.com/erikflowers/weather-icons
import './assets/css/weather-icons.min.css'

const Api_Key = process.env.REACT_APP_WEATHER_API_KEY;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false,
      backgroundImage: ''
    };

    // weather icons depending on the weather
    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  // check weather and specify that icon to the state
  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({
          icon: icons.Thunderstorm,
          backgroundImage: 'https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({
          icon: icons.Drizzle,
          backgroundImage: 'https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({
          icon: icons.Rain,
          backgroundImage: 'https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({
          icon: icons.Snow,
          backgroundImage: 'https://images.pexels.com/photos/839462/pexels-photo-839462.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({
          icon: icons.Atmosphere,
          backgroundImage: 'https://images.pexels.com/photos/531321/pexels-photo-531321.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        });
        break;
      case rangeId === 800:
        this.setState({
          icon: icons.Clear,
          backgroundImage: 'https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({
          icon: icons.Clouds,
          backgroundImage: 'https://images.pexels.com/photos/158827/field-corn-air-frisch-158827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        });
        break;
      default:
        this.setState({
          icon: icons.Clouds,
          backgroundImage: ''
        });
    }
  }

  // calculate celsius
  calCelsius(temp) {
    return Math.floor(temp - 273.15);
  }

  // event handler for onSubmit button in the form component
  getWeather = async e => {
    e.preventDefault();

    // get values from textboxes
    const country = e.target.elements.country.value.trim();
    const city = e.target.elements.city.value.trim();

    if (country && city) {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
      );

      const response = await api_call.json();

      // get values from api and specify to the state
      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });

      // setting icons
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

    } else {
      this.setState({
        error: true
      });
    }
  };

  render() {
    const {city, icon, celsius, temp_max, temp_min, description, error, backgroundImage} = this.state;
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={error}/>
        <Weather
          cityname={city}
          weatherIcon={icon}
          temp_celsius={celsius}
          temp_max={temp_max}
          temp_min={temp_min}
          description={description}
          backgroundImage = {backgroundImage}
        />
      </div>
    );
  }
}

export default App;
