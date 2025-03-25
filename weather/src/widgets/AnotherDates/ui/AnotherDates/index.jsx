import { WeatherAccordion } from '../WeatherAccordion';
import styles from './AnotherDates.module.css';

export const AnotherDates = ({ weathers }) => {
  const dates = Object.keys(weathers);

  return (
    <div className={styles.root}>
      {dates.map((date, i) => {
        if (i === 0) return;
        const timings = weathers[date].map((timing) => {
          return {
            time: timing.dt_txt.split(' ')[1].slice(0, 5),
            icon: timing.weather.icon,
            temp: timing.main.temp,
          };
        });
        return <WeatherAccordion date={date} timings={timings} />;
      })}
    </div>
  );
};
