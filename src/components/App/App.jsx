import React, { useState, useEffect } from 'react';
import { UserForm } from '../Form/Form';
import { Contacts } from '../Contacts/Contacts';
import { Filter } from '../Filter/Filter';
import { PhonebookWrapper } from '../Form/Form.styled';

function App() {
  const [contacts, setContacts] = useState([]);
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
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  const addContact = data => {
    console.log(data);

    if (contacts.find(contact => contact.name === data.name)) {
      return alert(`${data.name} is already in contacts.`);
    }

    setContacts(prevContacts => [...prevContacts, data]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <PhonebookWrapper>
      <h1>Phonebook</h1>
      <UserForm getData={addContact} />
      <h2>Find contact by name</h2>
      <Filter value={filter} filterChange={changeFilter} />
      {contacts.length === 0 ? (
        <p>You don't have contacts </p>
      ) : (
        <Contacts data={filteredContacts} deleteContact={deleteContact} />
      )}
    </PhonebookWrapper>
  );
}

export { App };
