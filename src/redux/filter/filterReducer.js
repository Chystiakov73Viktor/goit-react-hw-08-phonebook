import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: '',
  },
  reducers: {
    setFilteredContacts(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { setFilteredContacts } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
