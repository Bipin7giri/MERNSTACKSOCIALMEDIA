import { createSlice } from '@reduxjs/toolkit';

const initialModeState = {
  isMode: JSON.parse(localStorage.getItem('mode')),
};
const modeSlice = createSlice({
  name: 'mode',
  initialState: initialModeState,
  reducers: {
    dark(state) {
      state.isMode = false;
      localStorage.removeItem('mode');
      localStorage.setItem('mode', JSON.parse(state.isMode));
    },
    light(state) {
      state.isMode = true;
      localStorage.removeItem('mode');
      localStorage.setItem('mode', state.isMode);
    },
  },
});
export { modeSlice };
export const modeAction = modeSlice.actions;
