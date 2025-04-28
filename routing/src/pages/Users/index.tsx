import { useEffect } from 'react';
import { CreateUserForm } from '@/features/users/create-user';
import { useUserStore, UserCell } from '@/entities/user';
import { DataSet } from '@/shared/ui/DataSet';
import styles from './Users.module.css';
import { DeleteUsers } from '@/features/users/delete-users';

export const Users = () => {
  const { users, loadUsers, selectedUsers, setSelectedUsers } = useUserStore();

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className={styles.root}>
      <CreateUserForm />
      <DeleteUsers />
      <DataSet
        data={users.sort((a, b) => a.id - b.id)}
        columns={[
          { id: 'id', title: 'ID' },
          { id: 'name', title: 'Имя' },
          { id: 'username', title: 'Nickname' },
          { id: 'phone', title: 'Номер телефона' },
          { id: 'website', title: 'Сайт' },
        ]}
        cellRender={(value, isSelected, columnId, row) => {
          return (
            <UserCell
              value={value}
              isSelected={isSelected}
              isSmall={columnId === 'id'}
              row={row}
              columnId={columnId}
            />
          );
        }}
        selectedRows={selectedUsers}
        setSelectedRows={setSelectedUsers}
      />
    </div>
  );
};
