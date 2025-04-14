import React from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './Form.module.css';
import Navigation from '../Navigation';
import { useUserStore } from '../../stores/user.store';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Имя обязательно'),
  age: Yup.number()
    .required('Возраст обязателен')
    .positive('Не может быть меньше 0')
    .integer('Должен быть числом'),
  email: Yup.string().email('Неверный email').required('Email обязателен'),
  pet: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Имя петомца обязательно'),
      age: Yup.number()
        .required('Возраст обязателен')
        .positive('Не может быть меньше 0')
        .integer('Должен быть числом'),
    }),
  ),
});

export const CreateUser = () => {
  const { addUser } = useUserStore();
  return (
    <div>
      <Navigation />
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Создать пользователя</h2>
        <Formik
          initialValues={{
            name: '',
            age: '',
            email: '',
            pet: [{ name: '', age: '' }],
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            addUser(values);
          }}>
          {({ values }) => (
            <Form>
              <div className={styles.formGroup}>
                <label htmlFor="name">Имя</label>
                <Field type="text" id="name" name="name" className={styles.inputField} />
                <ErrorMessage name="name" component="div" className={styles.error} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="age">Возраст</label>
                <Field type="number" id="age" name="age" className={styles.inputField} />
                <ErrorMessage name="age" component="div" className={styles.error} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" className={styles.inputField} />
                <ErrorMessage name="email" component="div" className={styles.error} />
              </div>

              <FieldArray name="pet">
                {({ push, remove }) => (
                  <div className={styles.petsSection}>
                    <h3>Питомцы</h3>
                    {values.pet.map((_, index) => (
                      <div key={index} className={styles.petItem}>
                        <div className={`${styles.formGroup} ${styles.petField}`}>
                          <label htmlFor={`pet[${index}].name`}>Имя питомца</label>
                          <Field
                            type="text"
                            id={`pet[${index}].name`}
                            name={`pet[${index}].name`}
                            className={styles.inputField}
                          />
                          <ErrorMessage
                            name={`pet[${index}].name`}
                            component="div"
                            className={styles.error}
                          />
                        </div>

                        <div className={`${styles.formGroup} ${styles.petField}`}>
                          <label htmlFor={`pet[${index}].age`}>Возраст питомца</label>
                          <Field
                            type="number"
                            id={`pet[${index}].age`}
                            name={`pet[${index}].age`}
                            className={styles.inputField}
                          />
                          <ErrorMessage
                            name={`pet[${index}].age`}
                            component="div"
                            className={styles.error}
                          />
                        </div>

                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnRemove}`}
                          onClick={() => remove(index)}>
                          Удалить питомца
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnAdd}`}
                      onClick={() => push({ name: '', age: '' })}>
                      Добавить питомца
                    </button>
                  </div>
                )}
              </FieldArray>

              <button type="submit" className={`${styles.btn} ${styles.btnSubmit}`}>
                Отправить
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
