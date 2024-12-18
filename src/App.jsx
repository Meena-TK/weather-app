import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import CurrentWeather from './components/CurrentWeather';


function App() {

  const [location, setLocation] = useState('Palakkad');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (city) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError('Unable to fetch weather data. Please check the city name and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(location);
  };

  useEffect(() => {
    fetchWeather('Palakkad');
  }, []);

  useEffect(() => {
    if (weatherData) {
      const weatherMain = weatherData.weather[0].main.toLowerCase();
      const backgroundMapping = {
        clear: 'linear-gradient(to bottom, #a1c4fd, #c2e9fb)',
        clouds: 'linear-gradient(to bottom, #d3cce3, #e9e4f0)',
        rain: 'linear-gradient(to bottom, #667db6, #0082c8, #0082c8, #667db6)',
        thunderstorm: 'linear-gradient(to bottom, #485563, #29323c)',
        snow: 'linear-gradient(to bottom, #e6dada, #274046)',
        mist: 'linear-gradient(to bottom, #606c88, #3f4c6b)',
      };
      document.body.style.background = backgroundMapping[weatherMain] || 'linear-gradient(to bottom, #a1c4fd, #c2e9fb)';
    }
  }, [weatherData]);

  return (
    <div className="app-container">
      <h1 className="app-title">🌤️ Weather App</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {loading && <p className="loading">Fetching the latest weather...</p>}
      {error && <p className="error-message">{error}</p>}
      {weatherData && <CurrentWeather weatherData={weatherData} />}
    </div>
  );
};
export default App