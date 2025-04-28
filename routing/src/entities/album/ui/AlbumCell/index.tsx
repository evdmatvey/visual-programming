import { useRef, useState } from 'react';
import { Album } from '../../model/types';
import styles from './AlbumCell.module.css';
import { useAlbumStore } from '../../model/store';

interface AlbumCellProps {
  value: Album[keyof Album];
  isSelected: boolean;
  isSmall: boolean;
  row: Album;
  columnId: keyof Album;
}

export const AlbumCell = ({ isSelected, isSmall, value, row, columnId }: AlbumCellProps) => {
  const [localValue, setLocalValue] = useState(value);
  const ref = useRef<HTMLInputElement>(null);
  const { updateAlbum } = useAlbumStore();

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
  };

  const handleBlur = () => {
    if (localValue !== value) {
      updateAlbum(row.id, { [columnId]: localValue });
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
