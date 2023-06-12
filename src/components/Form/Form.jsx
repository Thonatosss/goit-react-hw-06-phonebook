import { nanoid } from 'nanoid';
import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import { FormLabel, FilterButton, FormInput } from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelector } from 'redux/selectors/contactsSelector';
import {addContact} from 'redux/slices/contactSlice';



const initialValues = {
  name: '',
  number: '',
};
const schema = object({
  name: string()
    .min(2, 'Name must be at least 2 characters!')
    .max(25, 'Name must be at most 25 characters!')
    .required('Required!'),
  number: string()
    .min(7, 'Number must be at least 7 digits')
    .max(7, 'Number must be at most 7 digits')
    .required('Required!'),
});


function UserForm() {
  const contacts = useSelector(contactsSelector);
  const dispatch = useDispatch();

  const attachContact = data => {
    dispatch(addContact(data));
  };
  const handleFormSubmit = (values, { resetForm }) => {
    const { name } = values;

    if (contacts.find(contact => contact.name === name)) {
      return alert(`${name} is already in contacts.`);
    }
    const id = nanoid();
    const data = { ...values, id };
    attachContact(data);
    resetForm();
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      validationSchema={schema}
      initialValues={initialValues}
      validateOnChange={true}
    >
      <Form>
        <FormLabel>
          Name
          <FormInput type="text" name="name" required />
          <ErrorMessage name="name" component="div"></ErrorMessage>
        </FormLabel>

        <FormLabel>
          Number
          <FormInput type="tel" name="number" required />
          <ErrorMessage name="number" component="div"></ErrorMessage>
          <FilterButton type="submit">Add contact</FilterButton>
        </FormLabel>
      </Form>
    </Formik>
  );
}

export { UserForm };
