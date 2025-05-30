import { createSlice } from "@reduxjs/toolkit";

// Feed reducer
const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    updateFeed: (state, action) => {
      state.push(...action.payload);
    },
    removeUserFromFeed: (state, action) => {
      const newArr = state.filter((req) => req._id !== action.payload);
      return newArr;
    },
  },
});

export const { addFeed, updateFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
