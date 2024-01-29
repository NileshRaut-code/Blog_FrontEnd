import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.data = action.payload;
    },
    removeProduct: (state) => {
      state.data = null;
    },
  },
});

export const { addProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;
