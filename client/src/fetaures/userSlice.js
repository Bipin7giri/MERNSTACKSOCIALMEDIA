import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInfo: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {},
});
export default userSlice.reducer;
