import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
const appstore = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
});
export default appstore;
