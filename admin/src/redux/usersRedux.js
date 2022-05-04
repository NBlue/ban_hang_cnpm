import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
      
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  updateUsersStart,
  updateUsersSuccess,
  updateUsersFailure,
} = usersSlice.actions;

export default usersSlice.reducer;
