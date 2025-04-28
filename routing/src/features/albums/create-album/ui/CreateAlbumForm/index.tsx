import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { CreateAlbumDto, useAlbumStore } from '@/entities/album';
import styles from './CreateAlbumForm.module.css';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Название альбома обязательно'),
  userId: Yup.number()
    .required('ID пользователя обязательно')
    .positive('ID пользователя должен быть положительным')
    .typeError('Должно быть числом'),
});

export const CreateAlbumForm = () => {
  const initialValues: CreateAlbumDto = {
    title: '',
    userId: 10,
  };

  const { createAlbum } = useAlbumStore();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        createAlbum(values);
        actions.resetForm();
      }}>
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <Field className={styles.input} name="title" placeholder="Название" />
          {touched.title && errors.title && <div className={styles.error}>{errors.title}</div>}
          <Field className={styles.input} name="userId" placeholder="userId" />
          {touched.userId && errors.userId && <div className={styles.error}>{errors.userId}</div>}
          <button className={styles.button} type="submit">
            Создать
          </button>
        </Form>
      )}
    </Formik>
  );
};
