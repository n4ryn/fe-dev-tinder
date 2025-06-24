import { combineReducers, configureStore } from "@reduxjs/toolkit";

import connectionReducer from "./connectionSlice";
import feedReducer from "./feedSlice";
import requestReducer from "./requestSlice";
import userReducer from "./userSlice";

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
