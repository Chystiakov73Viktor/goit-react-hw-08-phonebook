import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectContactsValue } from 'redux/contacts/contactsSelectors';
import { addContact } from 'redux/contacts/contactsOperations';
import css from './ContactForm.module.css';

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={msg => <p className={css.errorText}>{msg}</p>}
    />
  );
};

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().min(7).max(20).required(),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContactsValue);
  const handlerSubmit = (values, { resetForm }) => {
    const changeNameCase = values.name.toLowerCase();
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === changeNameCase
    );

    if (isExist) {
      alert(`${values.name} is already in contacts.`);
      return;
    }
    dispatch(addContact(values));
    resetForm();
  };
  const sampleName =
    "^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
  const sampleNumber =
    '\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}';

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handlerSubmit}
      >
        <Form className={css.formContact}>
          <label className={css.label}>
            Name
            <Field
              className={css.input}
              type="text"
              name="name"
              placeholder="Enter your name"
              pattern={sampleName}
              required
            />
            <FormError name="name" />
          </label>
          <label className={css.label}>
            Number
            <Field
              className={css.input}
              type="tel"
              name="number"
              placeholder="+380 (xx) xxx xx xx"
              pattern={sampleNumber}
              required
            />
            <FormError name="number" />
          </label>
          <button className={css.buttonContact} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </>
  );
};
