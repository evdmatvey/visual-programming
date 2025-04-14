import React from 'react';
import { useUserStore } from '../../stores/user.store';
import Navigation from '../Navigation';
import styles from './UserList.module.css';

export const UserList = () => {
  const { users } = useUserStore();
  return (
    <div>
      <Navigation />
      <div className={styles.list}>
        {users.map((user) => (
          <div className={styles.user}>
            <div className={styles.field}>Имя - {user.name}</div>
            <div className={styles.field}>Возраст - {user.age}</div>
            <div className={styles.field}>Email - {user.email}</div>
            <div className={styles.pets}>
              {user.pet.map((pet) => (
                <div>
                  Питомец - {pet.name} ({pet.age})
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
