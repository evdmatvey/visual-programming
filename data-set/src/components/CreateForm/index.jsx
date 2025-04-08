import { useRef } from 'react';
import styles from './CreateForm.module.css';

export const CreateForm = ({ createHandler }) => {
  const formRef = useRef();

  const submitHandler = async (formData) => {
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      body: formData.get('body'),
    };

    formRef.current.reset();
    await createHandler(data, 502);
  };

  return (
    <form action={submitHandler} className={styles.root} ref={formRef}>
      <input type="text" className={styles.input} name="name" placeholder="Имя" />
      <input type="text" className={styles.input} name="email" placeholder="Email" />
      <input type="text" className={styles.input} name="body" placeholder="Сообщение" />
      <button type="submit" className={styles.button}>
        Добавить
      </button>
    </form>
  );
};
