import { getFormattedDay } from '@/shared/lib/getFormattedDay';
import styles from './CurrentDay.module.css';

export const CurrentDay = () => {
  const currentDay = getFormattedDay();
  return <div className={styles.root}>{currentDay}</div>;
};
