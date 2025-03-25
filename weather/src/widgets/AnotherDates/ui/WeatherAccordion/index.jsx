import { useState } from 'react';
import styles from './WeatherAccordion.module.css';
import { getFormattedDay } from '@/shared/lib/getFormattedDay';

export const WeatherAccordion = ({ date, timings }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.root}>
      <div className={styles.heading} onClick={() => setIsOpen((prev) => !prev)}>
        {getFormattedDay(date)}
      </div>
      {isOpen && (
        <div className={styles.timings}>
          {timings.map((timing) => (
            <div className={styles.timing}>
              <div>{timing.time}</div>
              <img src={`https://openweathermap.org/img/wn/${timing.icon}@2x.png`} alt="icon" />
              <div>{Math.round(timing.temp)}°</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
