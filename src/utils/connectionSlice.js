import { createSlice } from "@reduxjs/toolkit";

// Connection reducer
const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    addConnection: (state, action) => {
      return action.payload;
    },
    updateConnection: (state, action) => {
      state.push(action.payload);
    },
    removeConnection: () => {
      return null;
    },
  },
});

export const { addConnection, updateConnection, removeConnection } =
  connectionSlice.actions;
export default connectionSlice.reducer;
