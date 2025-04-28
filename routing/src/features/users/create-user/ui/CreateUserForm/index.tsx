import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { CreateUserDto, useUserStore } from '@/entities/user';
import styles from './CreateUserForm.module.css';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Имя обязательно'),
  username: Yup.string().required('Имя пользователя обязательно'),
  email: Yup.string().email('Некорректный email').required('Email обязателен'),
  address: Yup.object().shape({
    street: Yup.string().required('Улица обязательна'),
    suite: Yup.string().required('Номер квартиры обязателен'),
    city: Yup.string().required('Город обязателен'),
    zipcode: Yup.string().required('Почтовый индекс обязателен'),
    geo: Yup.object().shape({
      lat: Yup.string().required('Широта обязательна'),
      lng: Yup.string().required('Долгота обязательна'),
    }),
  }),
  phone: Yup.string().required('Телефон обязателен'),
  website: Yup.string().required('Сайт обязателен'),
});

export const CreateUserForm = () => {
  const initialValues: CreateUserDto = {
    name: '',
    username: '',
    email: '',
    phone: '',
  };

  const { createUser } = useUserStore();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        createUser(values);

        actions.resetForm();
      }}>
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <Field className={styles.input} name="name" placeholder="Имя" />
          {touched.name && errors.name && <div className={styles.error}>{errors.name}</div>}
          <Field className={styles.input} name="username" placeholder="Имя пользователя" />
          {touched.username && errors.username && (
            <div className={styles.error}>{errors.username}</div>
          )}
          <Field className={styles.input} name="email" placeholder="Email" />
          {touched.email && errors.email && <div className={styles.error}>{errors.email}</div>}
          <Field className={styles.input} name="phone" placeholder="Телефон" />
          {touched.phone && errors.phone && <div className={styles.error}>{errors.phone}</div>}

          <button className={styles.button} type="submit">
            Обновить
          </button>
        </Form>
      )}
    </Formik>
  );
};
