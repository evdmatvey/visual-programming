import { CurrentWeather } from '@/widgets/CurrentWeather';
import { CurrentDay } from '@/widgets/CurrentDate';
import { AnotherDates } from '@/widgets/AnotherDates';
import { Settings } from '@/widgets/Settings';
import { useLoadWeathers } from '@/features/load-weathers';
import styles from './Weather.module.css';
import { useState } from 'react';

export const Weather = () => {
  const todayDate = new Date().toISOString().split('T')[0];
  const [selectedCity, setSelectedCity] = useState({
    name: 'London',
    coord: {
      lon: 47.159401,
      lat: 34.330502,
    },
  });
  const weathers = useLoadWeathers(selectedCity);

  return (
    <div className={styles.root}>
      <CurrentDay />
      {!weathers && <div>Loading...</div>}
      {weathers && (
        <CurrentWeather
          weather={weathers.currentWeather}
          timings={weathers.weatherList[todayDate]}
        />
      )}
      {weathers && <AnotherDates weathers={weathers.weatherList} />}
      <Settings selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
    </div>
  );
};
