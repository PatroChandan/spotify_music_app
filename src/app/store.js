import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import authReducer from "./authenticationSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    auth: authReducer,
  },
});
