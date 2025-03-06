import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  data: null,
  theme:"dark"
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
    themechange:(state)=>{
      state.theme=state.theme==="dark" ? "light" :"dark"
    }
  },
});

export const { login, logout,themechange } = userSlice.actions;

export default userSlice.reducer;
