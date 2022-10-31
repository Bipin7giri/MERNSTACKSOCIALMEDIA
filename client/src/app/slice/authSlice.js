import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isAtuhenticated: localStorage.getItem('isAuth'),
  email: localStorage.getItem('email'),
  token: localStorage.getItem('jwt'),
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAtuhenticated = true;
      localStorage.setItem('isAuth', JSON.stringify(state.isAtuhenticated));
    },
    logout(state) {
      state.isAtuhenticated = false;
      localStorage.removeItem('isAuth');
      localStorage.removeItem('email');
      localStorage.removeItem('jwt');
    },
    getEmail(state, action) {
      state.email = action.payload;
      localStorage.setItem('email', JSON.stringify(state.email));
    },
    saveToken(state, action) {
      state.token = action.payload;
      localStorage.setItem('jwt', action.payload);
    },
  },
});
export { authSlice };
export const authAction = authSlice.actions;
