import { createSlice } from '@reduxjs/toolkit';

const initialPostState = {
  initialPost: false,
  post: [],
};
const postSlice = createSlice({
  name: 'post',
  initialState: initialPostState,
  reducers: {
    updateNewsFeed(state) {
      state.initialPost === true
        ? (state.initialPost = false)
        : (state.initialPost = true);
    },
    savePost(state, actions) {
      state.post = actions.payload;
      localStorage.setItem('post', JSON.stringify(state.post));
    },
  },
});
export { postSlice };
export const postAction = postSlice.actions;
