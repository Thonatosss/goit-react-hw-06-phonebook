import React, { useState, useEffect } from 'react';
import { UserForm } from '../Form/Form';
import { Contacts } from '../Contacts/Contacts';
import { Filter } from '../Filter/Filter';
import { PhonebookWrapper } from '../Form/Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { setContact, addContact, deleteContact } from 'redux/slices/contactSlice';



function App() {
  const contacts = useSelector(state => state.contacts.contacts);
  console.log(contacts);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');
  const formattedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(formattedFilter)
  );
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    console.log(contacts);
    if (parsedContacts) {
      dispatch(setContact(parsedContacts));
    }
  }, [dispatch]);

  const attachContact = data => {
    dispatch(addContact(data));
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const removeContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <PhonebookWrapper>
      <h1>Phonebook</h1>
      <UserForm getData={attachContact} />
      <h2>Find contact by name</h2>
      <Filter value={filter} filterChange={changeFilter} />
      {contacts.length === 0 ? (
        <p>You don't have contacts </p>
      ) : (
        <Contacts data={filteredContacts} deleteContact={removeContact} />
      )}
    </PhonebookWrapper>
  );
}

export { App };
