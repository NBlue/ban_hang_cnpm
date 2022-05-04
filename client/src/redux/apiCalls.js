import { loginFailure, loginStart, loginSuccess,logoutSuccess } from "./userRedux";
import { publicRequest } from "../requestMethod";
//cac api viet cho cac state trong redux
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    console.log(res.data);
    dispatch(loginSuccess(res.data));
    
  } catch (err) { 
    dispatch(loginFailure());
    
  }
};
export const logout = async (dispatch) => {
  dispatch(loginStart());
  try {
    dispatch(logoutSuccess(null));
    alert("Đăng xuất thành công!");
  } catch (err) { 
    
    alert("Chưa có người dùng!");
  }
};

export const register = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    console.log(res.data);
    
  } catch (err) { 
    
  }
};

