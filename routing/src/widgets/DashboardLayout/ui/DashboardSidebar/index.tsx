import { routesConfig } from '@/shared/config/routes.config';
import styles from './DashboardSidebar.module.css';
import { NavLink } from 'react-router';

export const DashboardSidebar = () => {
  const routes = Object.entries(routesConfig).map((route) => {
    return {
      name: route[0].toLowerCase(),
      path: route[1],
    };
  });

  const getLinkClasses = ({ isActive }: { isActive: boolean }) => (isActive ? styles.active : '');

  return (
    <div className={styles.root}>
      <nav>
        <ul className={styles.menu}>
          {routes.map((route) => (
            <li>
              <NavLink to={route.path} className={getLinkClasses}>
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
