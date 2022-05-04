import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    point:0,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.point=action.payload.point;
    },
    logoutSuccess:(state)=>{
      state.isFetching=false;
      state.currentUser=null;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    setPoint:(state,action)=>{
      state.point=action.payload+state.point;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure,logoutSuccess,setPoint } = userSlice.actions;
export default userSlice.reducer;