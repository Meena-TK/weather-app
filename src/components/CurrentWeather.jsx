import React from 'react';
import { motion } from 'framer-motion';
import './CurrentWeather.css';

const CurrentWeather = ({ weatherData }) => (
  <motion.div
    className="current-weather-container"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="current-weather-title">Current Weather 🌡️</h2>
    <motion.div
      className="current-weather-item"
      whileHover={{ scale: 1.05, boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)' }}
    >
      <p className="current-weather-location">📍 {weatherData.name}</p>
      <p className="current-weather-temp">{weatherData.main.temp}°C</p>
      <p className="current-weather-desc">{weatherData.weather[0].description}</p>
    </motion.div>
  </motion.div>
);



export default CurrentWeather