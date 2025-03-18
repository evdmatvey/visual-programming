import { useRef } from 'react';
import { ArrowDown } from './ArrowDown';
import { ArrowUp } from './ArrowUp';
import styles from './CommentsSort.module.css';
import { useState } from 'react';
import { useOutsideClick } from '../../hooks/useClickOutside';
import { useCommentsContext } from '../../contexts/CommentsContext/useCommentContext';

export const CommentsSort = () => {
  const sortVariants = [
    {
      sortBy: 'postId',
      sortType: 'asc',
    },
    {
      sortBy: 'postId',
      sortType: 'desc',
    },
    {
      sortBy: 'name',
      sortType: 'asc',
    },
    {
      sortBy: 'name',
      sortType: 'desc',
    },
  ];

  const { sortBy, sortType, setSortBy, setSortType } = useCommentsContext();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useOutsideClick(ref, () => setIsOpen(false));

  const getSortByHeading = (sortBy) => (sortBy === 'name' ? 'Имя' : 'postId');
  const getSortTypeHeading = (sortType) => (sortType === 'asc' ? <ArrowUp /> : <ArrowDown />);

  const getSortVariantClasses = (variant) => {
    const isActive = variant.sortBy === sortBy && variant.sortType === sortType;

    return `${styles.variant} ${isActive ? styles.active : ''}`;
  };

  const selectVariantHandler = (variant) => {
    setSortBy(variant.sortBy);
    setSortType(variant.sortType);
    setIsOpen(false);
  };

  return (
    <div className={styles.root} ref={ref}>
      <div className={styles.heading} onClick={() => setIsOpen((prev) => !prev)}>
        <div className={styles.selected}>
          {getSortByHeading(sortBy)}
          {getSortTypeHeading(sortType)}
        </div>
      </div>
      {isOpen && (
        <div className={styles.variants}>
          {sortVariants.map((variant) => (
            <div
              className={getSortVariantClasses(variant)}
              onClick={() => selectVariantHandler(variant)}>
              {getSortByHeading(variant.sortBy)}
              {getSortTypeHeading(variant.sortType)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
