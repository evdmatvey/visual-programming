import React from 'react';
import { NavLink } from 'react-router';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Пользователи </div>
      <ul className={styles.navList}>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }>
            Список пользователей
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/form"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }>
            Создать пользователя
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
