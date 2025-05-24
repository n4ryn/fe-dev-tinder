import { configureStore } from "@reduxjs/toolkit";

// Reducers
import userReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default appStore;
