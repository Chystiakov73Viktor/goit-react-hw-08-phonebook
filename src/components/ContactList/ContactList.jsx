import React from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectContactsValue } from 'redux/contacts/contactsSelectors';
import { selectFilteredValue } from 'redux/filter/filterSelectors';
import { ContactItem } from 'components/ContactItem/ContactItem';
import css from './ContactList.module.css';

export const ContactList = () => {
  const selectFiltered = createSelector(
    [selectContactsValue, selectFilteredValue],
    (contacts, filter) => {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
  );

  const contactFiltered = useSelector(selectFiltered);

  return (
    <ul className={css.list}>
      {contactFiltered.map(contact => (
        <ContactItem key={contact.id} {...contact} />
      ))}
    </ul>
  );
};
