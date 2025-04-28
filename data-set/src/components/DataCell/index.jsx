import { useState, useRef, useEffect } from 'react';
import styles from './DataCell.module.css';

export const DataCell = ({ value, isSelected, isSmall, updateHandler, row, columnId }) => {
  const [localValue, setLocalValue] = useState(value);
  const ref = useRef();

  useEffect(() => setLocalValue(value), [value]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  const handleBlur = () => {
    if (localValue !== value) {
      updateHandler(row.id, {
        [columnId]: columnId === 'id' ? Number(localValue) : localValue,
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') ref.current.blur();
    else if (e.key === 'Escape') setLocalValue(value);
  };

  const classes = [styles.content, isSmall ? styles.small : ''].join(' ');

  return (
    <div className={classes}>
      {isSelected ? (
        <input
          ref={ref}
          type={columnId === 'id' ? 'number' : 'text'}
          className={styles.root}
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        value
      )}
    </div>
  );
};
