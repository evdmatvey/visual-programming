import { useRef, useState } from 'react';
import { User } from '../../model/types';
import styles from './UserCell.module.css';

interface UserCellProps {
  value: User[keyof User];
  isSelected: boolean;
  isSmall: boolean;
  row: User;
  columnId: keyof User;
}

export const UserCell = ({ isSelected, isSmall, value }: UserCellProps) => {
  const [localValue, setLocalValue] = useState(value.toString());
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
  };

  const handleBlur = () => {
    if (localValue !== value) {
      // updateHandler(row.id, { [columnId]: localValue });
    }
  };

  const handleKeyDown = (key: string) => {
    if (key === 'Enter') {
      ref.current?.blur();
      handleBlur();
    } else if (key === 'Escape') {
      setLocalValue(value.toString());
    }
  };

  const classes = [styles.content, isSmall ? styles.small : ''].join(' ');

  return (
    <div className={classes}>
      {isSelected ? (
        <input
          ref={ref}
          type="text"
          className={styles.root}
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e.key)}
        />
      ) : (
        value.toString()
      )}
    </div>
  );
};
