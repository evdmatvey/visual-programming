import { useRef, useState } from 'react';
import { Post } from '../../model/types';
import styles from './PostCell.module.css';

interface PostCellProps {
  value: Post[keyof Post];
  isSelected: boolean;
  isSmall: boolean;
  row: Post;
  columnId: keyof Post;
}

export const PostCell = ({ isSelected, isSmall, value }: PostCellProps) => {
  const [localValue, setLocalValue] = useState(value);
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
      setLocalValue(value);
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
        value
      )}
    </div>
  );
};
