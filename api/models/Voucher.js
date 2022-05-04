const mongoose=require("mongoose");

const VoucherSchema=new mongoose.Schema(
    {
    value:{type:Number,required:true,unique:true},
    desc:{type:String,required:true},
    img:{type:String,required:true},
    min:{type:Number,required:true},
    day:{type:Date,required:true},
    status:{type:Boolean,default:false},
},
  {timestamps:true}
);
module.exports=mongoose.model("Voucher",VoucherSchema);