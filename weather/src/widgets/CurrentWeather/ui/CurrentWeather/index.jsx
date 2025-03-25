import styles from './CurrentWeather.module.css';

export const CurrentWeather = ({ weather, timings }) => {
  const feelsLike = (weather.main.feels_like >= 0 ? '+' : '') + Math.round(weather.main.feels_like);
  const temp = (weather.main.temp >= 0 ? '+' : '') + Math.round(weather.main.temp);
  const mappedTimings = timings.map((timing) => {
    return {
      time: timing.dt_txt.split(' ')[1].slice(0, 5),
      icon: timing.weather.icon,
      temp: timing.main.temp,
    };
  });

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <img
            className={styles.image}
            src={`https://openweathermap.org/img/wn/${weather.weather.icon}@4x.png`}
            alt="icon"
          />
          <div className={styles.texts}>
            <div className={styles.feelsLike}>Feels like: {feelsLike}°</div>
            <div className={styles.temp}>{temp}°</div>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.card}>
            <div className={styles.title}>Humidity</div>
            <div className={styles.text}>{weather.main.humidity}%</div>
          </div>
          <div className={styles.card}>
            <div className={styles.title}>Wind</div>
            <div className={styles.text}>{weather.wind.speed} m/s</div>
          </div>
          <div className={styles.card}>
            <div className={styles.title}>Air Pressure</div>
            <div className={styles.text}>{weather.main.humidity}%</div>
          </div>
          <div className={styles.card}>
            <div className={styles.title}>{weather.weather.main}</div>
            <div className={styles.text}>{weather.weather.description}</div>
          </div>
        </div>
      </div>
      <div className={styles.timings}>
        {mappedTimings.map((timing) => (
          <div className={styles.timing}>
            <div>{timing.time}</div>
            <img src={`https://openweathermap.org/img/wn/${timing.icon}@2x.png`} alt="icon" />
            <div>{Math.round(timing.temp)}°</div>
          </div>
        ))}
      </div>
    </div>
  );
};
