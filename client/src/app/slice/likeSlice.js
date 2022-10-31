import { createSlice } from '@reduxjs/toolkit';

const initialLikeState = {
  likes: [{}],
};
const likeSlice = createSlice({
  name: 'likes',
  initialState: initialLikeState,
  reducers: {
    saveLike(state, actions) {
      state.likes = actions.payload;
      localStorage.setItem('likes', JSON.stringify(state.likes));
    },
  },
});
export { likeSlice };
export const likeAction = likeSlice.actions;
