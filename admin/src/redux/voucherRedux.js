import { createSlice } from "@reduxjs/toolkit";

export const voucherSlice = createSlice({
  name: "voucher",
  initialState: {
    vouchers: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getVoucherStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getVoucherSuccess: (state, action) => {
      state.isFetching = false;
      state.vouchers = action.payload;
    },
    getVoucherFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteVoucherStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteVoucherSuccess: (state, action) => {
      state.isFetching = false;
      state.vouchers.splice(
        state.vouchers.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteVoucherFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateVoucherStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateVoucherSuccess: (state, action) => {
      state.isFetching = false;
      state.vouchers[
        state.vouchers.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.voucher;
    },
    updateVoucherFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    addVoucherStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addVoucherSuccess: (state, action) => {
      state.isFetching = false;
      state.vouchers.push(action.payload);
    },
    addVoucherFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getVoucherStart,
  getVoucherSuccess,
  getVoucherFailure,
  deleteVoucherStart,
  deleteVoucherSuccess,
  deleteVoucherFailure,
  updateVoucherStart,
  updateVoucherSuccess,
  updateVoucherFailure,
  addVoucherStart,
  addVoucherSuccess,
  addVoucherFailure,
} = voucherSlice.actions;

export default voucherSlice.reducer;
