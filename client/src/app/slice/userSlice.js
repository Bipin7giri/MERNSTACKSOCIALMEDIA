import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  users: [{}],
};
const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    saveUser(state, actions) {
      state.users = actions.payload;
      localStorage.setItem('user', JSON.stringify(actions.payload));
    },
  },
});
export { userSlice };
export const userAction = userSlice.actions;
