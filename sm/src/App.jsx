import { Accordion } from './Accordion';
import styles from './App.module.css';

export const App = () => {
  const renderHeader = (header, isOpen) => {
    return (
      <div className={styles.header}>
        <div className={styles.title}>
          {header.id}.{header.question}
        </div>
        <div className={styles.state}>{isOpen ? '-' : '+'}</div>
      </div>
    );
  };

  const renderHeader2 = (header, isOpen) => {
    return (
      <div className={styles.header}>
        <div className={styles.title}>
          {header.fruits.join(' ')} - {header.title}
        </div>
        <div className={styles.state2}>{isOpen ? '-' : '+'}</div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <Accordion header={{ id: 1, question: 'Lorem, ipsum dolor.' }} renderHeader={renderHeader}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus reprehenderit animi,
        veritatis dolorem quibusdam ipsum possimus aut officia sint harum.
      </Accordion>
      <Accordion header={{ id: 2, question: 'Lorem, ipsum.' }} renderHeader={renderHeader}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus reprehenderit animi,
        veritatis dolorem quibusdam ipsum possimus aut officia sint harum.
      </Accordion>
      <Accordion
        header={{ id: 3, question: 'Lorem ipsum dolor sit amet.' }}
        renderHeader={renderHeader}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus reprehenderit animi,
        veritatis dolorem quibusdam ipsum possimus aut officia sint harum.
      </Accordion>
      <Accordion header={{ id: 4, question: 'Lorem ipsum dolor sit.' }} renderHeader={renderHeader}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus reprehenderit animi,
        veritatis dolorem quibusdam ipsum possimus aut officia sint harum.
      </Accordion>
      <Accordion
        header={{ fruits: ['🍅', '🍉', '🫐'], title: 'Ягоды' }}
        renderHeader={renderHeader2}>
        <ul>
          <li>🍅 Помидор</li>
          <li>🍉 Арбуз</li>
          <li>🫐 Черника</li>
        </ul>
      </Accordion>
    </div>
  );
};
