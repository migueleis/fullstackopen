import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

const ShowCountry = ({ country }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    //http://api.weatherstack.com/current?access_key=b0c43f3002be033e1a742b5303638354&query=New%20York
    const query = 'http://api.weatherstack.com/current?access_key=' + process.env.REACT_APP_API_KEY
    + '&query=' + country.name.common;
    //const query = 'http://api.weatherstack.com/historical?access_key=b0c43f3002be033e1a742b5303638354'
    //+ '&query=Finland&historical_date_start=2015-01-21historical_date_end2015-01-25';
    console.log('query', query);
    axios
      .get(query,{ maxRedirects: 0 })
      .then(response => {
        console.log('weather', response.data);
        setWeather(response.data);
      })
      .catch(function (error) {
        console.log('Error getting weather');
      })
  }, []);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>{country.capital}</p>
      <p>{country.population}</p>
      <h3>Languages</h3>
      <p>{Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}</p>
      <img width='100' src={country.flags.png} />
      {weather &&
        <div>
          <h3>Weather in {country.name.common}</h3>
          <p>Temperature: {weather?.current?.temperature}</p>
          <img width='50' src={weather?.current?.weather_icons[0]} />
          <p>Wind: {weather?.current?.wind_speed} mph direcction {weather?.current?.wind_speed_dir}</p>
        </div>
      }
    </div>
  )
}

const ShowListCountries = ({ countries, onClick }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => onClick(country)}>show</button>
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const [textCountry, setTextCountry] = useState('');
  const [countries, setCountries] = useState([]);

  const handleChange = (event) => {
    setTextCountry(event.target.value);
    const countryName = event.target.value;
    if (countryName === '') {
      setCountries([]);
      return;
    }
    axios
      .get('https://restcountries.com/v3.1/name/' + countryName)
      .then(response => {
        console.log('countries', response.data);
        setCountries(response.data);
      })
      .catch(function (error) {
        console.log('No countries found by that filter!');
      })
  }

  const handleClick = (country) => {
    console.log('click', country);
    setCountries([country]);
  }

  return (
    <>
      <div>
        Find countries <input onChange={handleChange} value={textCountry} />
      </div>
      {console.log('countries', countries.length)}
      {countries.length <= 0 && <p></p>}
      {countries.length === 1 && <ShowCountry country={countries[0]} />}
      {countries.length > 1 && countries.length <= 10 && <ShowListCountries countries={countries} onClick={handleClick} />}
      {countries.length > 10 && <p>Too many matches, specify another filter</p>}
    </>
  )
}

export default App;

//From React 18.0.0
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);