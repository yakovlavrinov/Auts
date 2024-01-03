import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import { rememberReducer, rememberEnhancer } from "redux-remember";

const rememberedKeys = ["auth"];

const store = configureStore({
  reducer: rememberReducer({
    auth: authSlice,
  }),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(
      rememberEnhancer(window.localStorage, rememberedKeys)
    ),
});

export default store;
