const mongoose=require("mongoose");
//neu da co voucher trong cart thi ko the save
//lay ra mang cart.vouchers.type roi xac dinh neu trong mang do thi la da luu voucher
const CartSchema=new mongoose.Schema(
    {
    userId:{type:String,required:true},
    products:[
        {
            productId:{
                type:String,
            },
            quantity:{
                type:Number,
                default:1,
            },
        },
    ],
    vouchers:[
        {
             voucherId:{
                 type:String,
             },
             des:{
                 type:String,    
             },
             type:{
                type:Number,    
            },
            status:{
                type:Boolean
            }
        },
    ]
},
  {timestamps:true}
);
module.exports=mongoose.model("Cart",CartSchema);
