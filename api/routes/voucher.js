const router=require("express").Router();
const {verifyToken,verifyTokenandAuthorization, verifyTokenandAdmin}=require("./verifyToken");
const Voucher=require("../models/Voucher");

//Create
router.post("/",verifyTokenandAdmin,async(req,res)=>{
 const newVoucher=new Voucher(req.body)

 try{
     const savedVoucher=await newVoucher.save();
     res.status(200).json(savedVoucher);
 }catch(err){
     res.status(500).json(err);
 }
})


 

//UPDATE
router.put("/:id",verifyToken,async (req,res)=>{
    try{
        const updatedVoucher=await Voucher.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
        );
        res.status(200).json(updatedVoucher);
    } catch(err){
      res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id",verifyTokenandAdmin,async (req,res)=>{
    try{
        await Voucher.findByIdAndDelete(req.params.id);
        res.status(200).json("Sản phẩm đã bị xóa");
    }catch(err){
        res.status(500).json(err )
    }
});


//GET ALL vouchers 
router.get("/",async(req,res)=>{
    const qnew=req.query.new;
   
    try{
        let vouchers;
        if(qnew){
            vouchers=await Voucher.find().sort({createdAt:-1}).limit(5)
        } else{
           vouchers=await Voucher.find(); 
        }
        res.status(200).json(vouchers);
    }catch(err){
        res.status(500).json(err );
    }
});

//GET Voucher
//router.get("/find/:id", async (req,res)=>{
 //   try{
  //      const voucher=await Voucher.findById(req.params.id);
  //     
   //     res.status(200).json(voucher);
  //  }catch(err){
 //       res.status(500).json(err );
 ////   }
//});

module.exports=router