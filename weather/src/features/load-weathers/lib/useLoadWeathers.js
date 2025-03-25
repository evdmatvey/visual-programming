import { useState, useEffect } from 'react';
import { weatherService } from '@/entities/weather';
import { changeTime } from '@/shared/lib/change-time';
import { changeWeather } from '@/shared/lib/change-weather';

const getTimeFromCurrentWeather = (weather) => {
  return weather.weather.icon.includes('d') ? 'day' : 'night';
};

const getWeatherFromCurrentWeather = (weather) => {
  const weathersByIcon = {
    '01': 'clear-sky',
    '02': 'few-clouds',
    '03': 'scattered-clouds',
    '04': 'broken-clouds',
    '09': 'shower-rain',
    10: 'rain',
    11: 'thunderstorm',
    13: 'snow',
    50: 'mist',
  };

  return weathersByIcon[weather.weather.icon.slice(0, 2)];
};

export const useLoadWeathers = (city) => {
  const [weathers, setData] = useState(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      const res = await weatherService.fetchWeathersList(city.coord.lat, city.coord.lon);
      const { currentWeather } = res;
      console.log(res);

      changeTime(getTimeFromCurrentWeather(currentWeather));
      changeWeather(getWeatherFromCurrentWeather(currentWeather));

      setData(res);
    };
    loadWeatherData();
  }, [city.name]);

  return weathers;
};
