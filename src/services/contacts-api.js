import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const fetchGetContacts = async () => {
  const response = await axios.get('/contacts');
  return response.data;
};

export const fetchAddContact = async ({ name, number }) => {
  const response = await axios.post('/contacts', { name, number });
  return response.data;
};

export const fetchDeleteContact = async id => {
  const response = await axios.delete(`/contacts/${id}`);
  return response.data;
};
