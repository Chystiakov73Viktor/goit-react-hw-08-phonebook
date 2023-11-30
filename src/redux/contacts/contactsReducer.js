import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getContacts, addContact, deleteContact } from './contactsOperations';

const contactsSlice = createSlice({
  name: 'users',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },

  extraReducers: builder =>
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addMatcher(isAnyOf(...getRequests('pending')), handlePending)
      .addMatcher(isAnyOf(...getRequests('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getRequests('rejected')), handleRejected),
});

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const arrayRequests = [getContacts, addContact, deleteContact];

const getRequests = type => arrayRequests.map(action => action[type]);

export const contactsReducer = contactsSlice.reducer;
