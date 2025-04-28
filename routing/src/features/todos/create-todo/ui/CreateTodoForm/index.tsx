import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { CreateTodoDto, useTodoStore } from '@/entities/todo';
import styles from './CreateTodoForm.module.css';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Название задачи обязательно'),
  completed: Yup.boolean().required('Статус выполнения обязателен'),
  userId: Yup.number()
    .required('ID пользователя обязательно')
    .positive('ID пользователя должен быть положительным')
    .typeError('Должно быть числом'),
});

export const CreateTodoForm = () => {
  const initialValues: CreateTodoDto = {
    title: '',
    completed: false,
    userId: 10,
  };

  const { createTodo } = useTodoStore();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        createTodo(values);
        actions.resetForm();
      }}>
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <Field className={styles.input} name="title" placeholder="Название" />
          {touched.title && errors.title && <div className={styles.error}>{errors.title}</div>}
          <label htmlFor="completed">
            Выполнено
            <Field className={styles.checkbox} name="completed" type="checkbox" id="completed" />
          </label>
          {touched.completed && errors.completed && (
            <div className={styles.error}>{errors.completed}</div>
          )}
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
