import React from "react";
import './weather.styles.scss';

const Weather = props => {
  return (
    <div className="container text-light">
      <div className={props.backgroundImage ? (
          'Card'
          ) : ''}
        >
        <h1 className="text-light py-3">{props.cityname}</h1>
        <h5 className="py-4">
          <i className={`wi ${props.weatherIcon} display-1`}/>
        </h5>

        {/* Get Celsius */}
        {props.temp_celsius ? (
          <h1 className="py-2">{props.temp_celsius}&deg;C</h1>
        ) : null}

        {/* show max and min temp */}
        {maxMinTemp(props.temp_min, props.temp_max)}

        {/* Weather description */}
        <h4 className="py-3">
          {props.description.charAt(0).toUpperCase() +
          props.description.slice(1)}
        </h4>
        {props.backgroundImage ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={props.backgroundImage} alt='image'/>
        ) : null}
      </div>
    </div>
  );
};

export default Weather;

function maxMinTemp(min, max) {
  if (max && min) {
    return (
      <h3>
        <span className="px-4">
          <i className='wi wi-thermometer-exterior' />
           min {min}&deg;C
        </span>
        <span className="px-4">
          <i className='wi wi-thermometer' />
           max {max}&deg;C
        </span>
      </h3>
    );
  }
}
