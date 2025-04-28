import { Outlet } from 'react-router';
import { DashboardSidebar } from '../DashboardSidebar';
import styles from './DashboardLayout.module.css';

export const DashboardLayout = () => {
  return (
    <div className={styles.root}>
      <DashboardSidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
