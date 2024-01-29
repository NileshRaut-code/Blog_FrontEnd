import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.data = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.data = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
