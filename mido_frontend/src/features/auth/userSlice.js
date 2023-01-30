import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    removeUser: (state) => {
      state.user = "";
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
