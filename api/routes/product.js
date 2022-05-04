const router=require("express").Router();
const {verifyToken,verifyTokenandAuthorization, verifyTokenandAdmin}=require("./verifyToken");
const Product=require("../models/Product");

//Create
router.post("/",verifyTokenandAdmin,async(req,res)=>{
 const newProduct=new Product(req.body)

 try{
     const savedProduct=await newProduct.save();
     res.status(200).json(savedProduct);
 }catch(err){
     res.status(500).json(err);
 }
})




//UPDATE
router.put("/:id",verifyTokenandAdmin,async (req,res)=>{
    try{
        const updatedProduct=await Product.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
        );
        res.status(200).json(updatedProduct);
    } catch(err){
      res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id",verifyTokenandAdmin,async (req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Sản phẩm đã bị xóa");
    }catch(err){
        res.status(500).json(err )
    }
});

//GET Product
router.get("/find/:id", async (req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
       
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err );
    }
});

//GET ALL Products 
router.get("/",async(req,res)=>{
    const qnew=req.query.new;
    const qCategory=req.query.category;
    try{
        let products;
        if(qnew){
            products=await Product.find().sort({createdAt:-1}).limit(5)
        } else if(qCategory){
            products=await Product.find({categories:{
                $in:[qCategory],
            },

        });
        }else{
           products=await Product.find(); 
        }
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err );
    }
});

/*/GET USER STATS
router.get("/stats",verifyTokenandAdmin,async(req,res)=>{
    const date=new Date();
    const lastYear=new Date(date.setFullYear(date.getFullYear()-1));
try{
  const data=await User.aggregate([
      {$match:{createAt:{$gte:lastYear}}},
      {
        $project:{
            month:{$month:"$createdAt"},
        },  
      },
      {
          $group:{
              _id:"$month",
              total:{$sum: 1},
          },
      },
  ]);
  res.status(200).json(data)
}catch(err){
    res.status(500).json(err);
}
});
*/
module.exports=router