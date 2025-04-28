import { useRef, useState } from 'react';
import { Todo } from '../../model/types';
import styles from './TodoCell.module.css';

interface TodoCellProps {
  value: Todo[keyof Todo];
  isSelected: boolean;
  isSmall: boolean;
  row: Todo;
  columnId: keyof Todo;
}

export const TodoCell = ({ isSelected, isSmall, value }: TodoCellProps) => {
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
