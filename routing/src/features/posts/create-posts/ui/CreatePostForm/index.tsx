import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { CreatePostDto, usePostStore } from '@/entities/post';
import styles from './CreatePostForm.module.css';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Название поста обязательно'),
  body: Yup.string().required('Содержание поста обязательно'),
  userId: Yup.number()
    .required('ID пользователя обязательно')
    .positive('ID пользователя должен быть положительным')
    .typeError('Должно быть числом'),
});

export const CreatePostForm = () => {
  const initialValues: CreatePostDto = {
    title: '',
    body: '',
    userId: 10,
  };

  const { createPost } = usePostStore();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        createPost(values);
        actions.resetForm();
      }}>
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <Field className={styles.input} name="title" placeholder="Название" />
          {touched.title && errors.title && <div className={styles.error}>{errors.title}</div>}
          <Field className={styles.textarea} name="body" placeholder="Содержание" as="textarea" />
          {touched.body && errors.body && <div className={styles.error}>{errors.body}</div>}
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
