import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
  
} from "./productRedux";
import {
  getOrderFailure,
  getOrderStart,
  getOrderSuccess,
  deleteOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  updateOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  addOrderFailure,
  addOrderStart,
  addOrderSuccess,
} from "./orderRedux";
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  
} from "./usersRedux";
import {
  getVoucherFailure,
  getVoucherStart,
  getVoucherSuccess,
  deleteVoucherFailure,
  deleteVoucherStart,
  deleteVoucherSuccess,
  updateVoucherFailure,
  updateVoucherStart,
  updateVoucherSuccess,
  addVoucherFailure,
  addVoucherStart,
  addVoucherSuccess,
  
} from "./voucherRedux";
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const getProduct = async (id,dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get(`/products/find/${id}`);
    console.log("up",res);
  } catch (err) {
    dispatch(getProductFailure());
  }
};


export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
     const res = await userRequest.delete(`/products/${id}`);
     console.log(res);
    dispatch(deleteProductSuccess(res.data));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
//  dispatch(updateProductStart());
  try {
    const res=await userRequest.put(`/products/${id}`,product);
    console.log(res);
 //   dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
   // dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};


export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/orders");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

export const getOrder = async (id,dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await publicRequest.get(`/orders/find/${id}`);
    console.log("up",res);
  } catch (err) {
    dispatch(getOrderFailure());
  }
};
export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
     const res = await userRequest.delete(`/orders/${id}`);
     console.log(res);
    dispatch(deleteOrderSuccess(res.data));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};

export const updateOrder = async (id, order, dispatch) => {
 // dispatch(updateOrderStart());
  try {
    const res=await userRequest.put(`/orders/${id}`,order);
    console.log(res);
   // dispatch(updateOrderSuccess({ id, order }));
  } catch (err) {
  // dispatch(updateOrderFailure());
  }
};
export const addOrder = async (order, dispatch) => {
  dispatch(addOrderStart());
  try {
    const res = await userRequest.post(`/orders`, order);
    dispatch(addOrderSuccess(res.data));
  } catch (err) {
    dispatch(addOrderFailure());
  }
};
export const getUser = async (id,dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await publicRequest.get(`/users/find/${id}`);
    console.log("getuser",res);
  } catch (err) {
    dispatch(getUsersFailure());
  }
};
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

export const getVouchers = async (dispatch) => {
  dispatch(getVoucherStart());
  try {
    const res = await publicRequest.get("/vouchers");
    dispatch(getVoucherSuccess(res.data));
  } catch (err) {
    dispatch(getVoucherFailure());
  }
};

export const getVoucher = async (id,dispatch) => {
  dispatch(getVoucherStart());
  try {
    const res = await publicRequest.get(`/vouchers/find/${id}`);
    console.log("up",res);
  } catch (err) {
    dispatch(getVoucherFailure());
  }
};


export const deleteVoucher = async (id, dispatch) => {
  dispatch(deleteVoucherStart());
  try {
     const res = await userRequest.delete(`/vouchers/${id}`);
     console.log(res);
    dispatch(deleteVoucherSuccess(res.data));
  } catch (err) {
    dispatch(deleteVoucherFailure());
  }
};

export const updateVoucher = async (id, voucher, dispatch) => {
 // dispatch(updateVoucherStart());
  try {
    const res=await userRequest.put(`/vouchers/${id}`,voucher);
    console.log(res);
  //  dispatch(updateVoucherSuccess({ id,voucher }));
  } catch (err) {
  //  dispatch(updateVoucherFailure());
  }
};
export const addVoucher = async (voucher, dispatch) => {
  dispatch(addVoucherStart());
  try {
    const res = await userRequest.post(`/vouchers`, voucher);
    dispatch(addVoucherSuccess(res.data));
  } catch (err) {
    dispatch(addVoucherFailure());
    console.log(err)
  }
};
