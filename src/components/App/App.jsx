import { UserForm } from '../Form/Form';
import { Contacts } from '../Contacts/Contacts';
import { Filter } from '../Filter/Filter';
import { PhonebookWrapper } from '../Form/Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import {addContact, deleteContact } from 'redux/slices/contactSlice';
import { setFilter } from 'redux/slices/filterSlice';



function App() {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter.filter);
  const dispatch = useDispatch();
  const formattedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(formattedFilter)
  );
  const attachContact = data => {
    dispatch(addContact(data));
  };

  const changeFilter = event => {
    dispatch(setFilter(event.target.value))
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
