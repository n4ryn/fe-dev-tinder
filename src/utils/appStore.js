import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Import all slices
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

// Combine all slice reducers
const appReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  connection: connectionReducer,
  request: requestReducer,
});

// Root reducer with reset logic
const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    state = undefined;
  }
  return appReducer(state, action);
};

// Configure store using rootReducer
const appStore = configureStore({
  reducer: rootReducer,
});

export default appStore;
