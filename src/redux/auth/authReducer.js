import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { logIn, logOut, refresh, authRegister } from './authOperations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(authRegister.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = { name: action.payload.name, email: action.payload.email };
        state.isRefreshing = true;
      })

      .addMatcher(isAnyOf(...getRequests('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getRequests('pending')), handlePending)
      .addMatcher(isAnyOf(...getRequests('rejected')), handleRejected),
});

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const arrayRequests = [authRegister, logIn, logOut, refresh];

const getRequests = type => arrayRequests.map(action => action[type]);

export const authReducer = authSlice.reducer;
