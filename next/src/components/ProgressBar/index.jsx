import React from 'react';
import styles from './ProgressBar.module.css';

export const ProgressBar = ({ title, percentage, isCanceled }) => {
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <div className={styles.bar}>
        <div
          className={styles.fill}
          style={{
            width: isCanceled ? '100%' : `${percentage}%`,
            backgroundColor: isCanceled ? '#ff4d4f' : '#2bd809',
          }}>
          <span className={styles.text}>
            {isCanceled ? 'Canceled' : `${Math.round(percentage)}%`}
          </span>
        </div>
      </div>
    </div>
  );
};
