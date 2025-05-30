import { createSlice } from "@reduxjs/toolkit";

// User reducer
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    updateUser: (state, action) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
