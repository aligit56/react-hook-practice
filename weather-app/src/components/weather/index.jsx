import { useEffect, useState } from 'react';
import Search from '../search';

const API_KEY = '1e01a3343ebd5d06cbb307103eb07e7f';

const themeMap = {
  Clear: 'theme-day',
  Clouds: 'theme-cloud',
  Rain: 'theme-rain',
  Drizzle: 'theme-rain',
  Thunderstorm: 'theme-rain',
  Snow: 'theme-snow',
  Mist: 'theme-cloud',
  Smoke: 'theme-cloud',
  Haze: 'theme-cloud',
  Fog: 'theme-cloud',
};

export default function Weather() {
  const [search, setSearch] = useState('Bangalore');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [theme, setTheme] = useState('theme-day');
  const [error, setError] = useState('');

  function getThemeForWeather(mainWeather) {
    if (!mainWeather) return 'theme-day';
    return themeMap[mainWeather] || 'theme-day';
  }

  async function fetchForecastData(city) {
    try {
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
      );

      const forecastJson = await forecastResponse.json();

      if (!forecastResponse.ok) {
        return;
      }

      const nextSevenDays = forecastJson.list
        .filter((item) => item.dt_txt.includes('12:00:00'))
        .slice(0, 7)
        .map((item) => ({
          date: new Date(item.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          }),
          temp: Math.round(item.main.temp),
          icon: item.weather[0]?.icon,
          main: item.weather[0]?.main,
        }));

      setForecast(nextSevenDays);
    } catch (err) {
      setForecast([]);
    }
  }

  async function fetchWeatherData(param) {
    const city = param.trim();

    if (!city) {
      setError('Please enter a city name.');
      setWeatherData(null);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong.');
      }

      setWeatherData(data);
      setSearch(data.name);
      setTheme(getThemeForWeather(data.weather?.[0]?.main));
      await fetchForecastData(data.name);
    } catch (err) {
      setWeatherData(null);
      setError(err.message || 'Unable to fetch weather for this city.');
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    fetchWeatherData(search);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  useEffect(() => {
    fetchWeatherData('Bangalore');
  }, []);

  return (
    <div className={`weather-shell ${theme}`}>
      <div className="weather-card">
        <div className="top-bar">
          <div className="theme-toggle-wrap">
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setTheme((prev) => (prev === 'theme-day' ? 'theme-night' : 'theme-day'))}
            >
              {theme === 'theme-day' ? 'Night mode' : 'Day mode'}
            </button>
          </div>
        </div>

        <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />

        {loading ? (
          <div className="loading-state">
            <div className="spinner" aria-label="Loading weather" />
            <span>Loading weather...</span>
          </div>
        ) : error ? (
          <div className="message-box error-box">
            <h3>No match found</h3>
            <p>{error}</p>
          </div>
        ) : weatherData ? (
          <main className="weather-content">
            <div className="location-row">
              <div>
                <p className="eyebrow">Current weather</p>
                <h1>
                  {weatherData.name}
                  <span>, {weatherData.sys.country}</span>
                </h1>
              </div>
              <div className="date-pill">{getCurrentDate()}</div>
            </div>

            <div className="temp-row">
              <div className="temp-block">
                <div className="temp-value">
                  {Math.round(weatherData.main.temp)}°C
                </div>
                <p className="description">
                  {weatherData.weather[0].description}
                </p>
              </div>

              {weatherData.weather[0]?.icon && (
                <img
                  className="condition-icon"
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt={weatherData.weather[0].main}
                />
              )}
            </div>

            <div className="weather-info">
              <div className="stat-card">
                <span>Feels like</span>
                <strong>{Math.round(weatherData.main.feels_like)}°C</strong>
              </div>
              <div className="stat-card">
                <span>Humidity</span>
                <strong>{weatherData.main.humidity}%</strong>
              </div>
              <div className="stat-card">
                <span>Wind</span>
                <strong>{Math.round(weatherData.wind.speed)} m/s</strong>
              </div>
              <div className="stat-card">
                <span>Pressure</span>
                <strong>{weatherData.main.pressure} hPa</strong>
              </div>
            </div>

            {forecast.length > 0 && (
              <div className="forecast-section">
                <div className="forecast-header">
                  <span>7-day forecast</span>
                </div>
                <div className="forecast-grid forecast-grid-seven">
                  {forecast.map((day) => (
                    <div className="forecast-card" key={`${day.date}-${day.temp}`}>
                      <p>{day.date}</p>
                      {day.icon && (
                        <img
                          src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                          alt={day.main}
                        />
                      )}
                      <strong>{day.temp}°C</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        ) : null}
      </div>
    </div>
  );
}