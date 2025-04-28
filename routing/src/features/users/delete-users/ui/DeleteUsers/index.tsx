import { useUserStore } from '@/entities/user';
import styles from './DeleteUsers.module.css';

export const DeleteUsers = () => {
  const { selectedUsers, deleteUser, setSelectedUsers } = useUserStore();

  const deleteHandler = async () => {
    if (selectedUsers.size === 0) return;

    const itemsToDelete = Array.from(selectedUsers);
    await Promise.all(itemsToDelete.map((id) => deleteUser(+id)));
    setSelectedUsers(new Set());
  };

  return (
    <button className={styles.root} disabled={selectedUsers.size === 0} onClick={deleteHandler}>
      Удалить ({selectedUsers.size})
    </button>
  );
};
