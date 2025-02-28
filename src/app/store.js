import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
