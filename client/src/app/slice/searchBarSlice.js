import { createSlice } from '@reduxjs/toolkit';

const initialSearchState = {
  initialQuery: null,
};
const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
  reducers: {
    searchQuery(state, action) {
      state.initialQuery = action.payload;
    },
  },
});
export { searchSlice };
export const searchAction = searchSlice.actions;
