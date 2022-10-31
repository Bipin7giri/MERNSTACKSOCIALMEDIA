import { createSlice } from '@reduxjs/toolkit';

const initialFollowingState = {
  following: [],
};
const followingSlice = createSlice({
  name: 'following',
  initialState: initialFollowingState,
  reducers: {
    saveFollowing(state, actions) {
      state.following = actions.payload;
      //   localStorage.setItem('post', JSON.stringify(state.post));
    },
  },
});
export { followingSlice };
export const followingAction = followingSlice.actions;
