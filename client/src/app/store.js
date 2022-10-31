import { configureStore } from '@reduxjs/toolkit';
// const authslice = require("./slice/authSlice");
import { authSlice } from './slice/authSlice';
import { modeSlice } from './slice/darklightSlice';
import { followingSlice } from './slice/followingSlice';
import { likeSlice } from './slice/likeSlice';
import { postSlice } from './slice/postSlice';
import { searchSlice } from './slice/searchBarSlice';
import { userSlice } from './slice/userSlice';
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    post: postSlice.reducer,
    mode: modeSlice.reducer,
    search: searchSlice.reducer,
    user: userSlice.reducer,
    following: followingSlice.reducer,
    like: likeSlice.reducer,
  },
});
export default store;
