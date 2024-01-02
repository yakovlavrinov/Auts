import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
