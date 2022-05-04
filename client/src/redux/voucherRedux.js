import {createSlice} from "@reduxjs/toolkit";

const voucherSlice=createSlice({
    name:"voucher",
    initialState:{
        vouchers:[],    
    },
    reducers:{
       
       addVoucher:(state,action)=>{
            state.vouchers.push(action.payload);
            
        },
        deleteVoucher:(state)=>{
            state.vouchers=[];
        }
    },
});

export const {addVoucher,deleteVoucher} = voucherSlice.actions
export default voucherSlice.reducer;