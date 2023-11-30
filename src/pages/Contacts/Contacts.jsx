import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/contacts/contactsOperations';
import {
  selectContactsValue,
  selectContactsError,
  selectContactsIsLoading,
} from 'redux/contacts/contactsSelectors';
import css from './Contacts.module.css';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Loader } from 'components/Loader/Loader';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

function Contacts() {
  const contacts = useSelector(selectContactsValue);
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <>
      <h1 className={css.tatel}>Phonebook</h1>
      <ContactForm />
      <h2 className={css.tatelText}>Contacts</h2>
      {error !== null && <p className="textError">{error}</p>}
      {contacts.length !== 0 && (
        <>
          <Filter />
          <ContactList />
          <div className={css.container}>{isLoading && <Loader />}</div>
        </>
      )}
    </>
  );
}

export default Contacts;
