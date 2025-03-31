import { useState } from 'react';
import styles from './Accordion.module.css';

export const Accordion = ({ header, renderHeader, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.root}>
      <div className={styles.header} onClick={toggleOpen}>
        {renderHeader(header, isOpen)}
      </div>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};
