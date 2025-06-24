import { createSlice } from "@reduxjs/toolkit";

// Request reducer
const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newArr = state.filter(req => req._id !== action.payload);
      return newArr;
    },
  },
});

export const { addRequest, updateRequest, removeRequest } =
  requestSlice.actions;
export default requestSlice.reducer;
