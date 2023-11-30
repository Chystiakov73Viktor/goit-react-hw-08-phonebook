import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchGetContacts,
  fetchAddContact,
  fetchDeleteContact,
} from 'services/contacts-api';

export const getContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchGetContacts();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, { rejectWithValue }) => {
    try {
      const data = await fetchAddContact({ name, number });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      return await fetchDeleteContact(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
