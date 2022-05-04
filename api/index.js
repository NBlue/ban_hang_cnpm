const express = require("express");
const app = express();
var cors = require("cors");

app.use(cors()); // Use this after the variable declaration
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const orderVoucher = require("./routes/voucher");
dotenv.config();

// mongoose
//     .connect(process.env.MONGO_URL)
//     .then(() => console.log("DB connection successfully"))
//     .catch((err) => {
//         console.log(err);
//     });
mongoose
    .connect(
        "mongodb+srv://minhduong:duong2001@cluster0.hrdqe.mongodb.net/shop?retryWrites=true&w=majority"
    )
    .then(() => console.log("DB connection successfully"))
    .catch((err) => {
        console.log(err);
    });

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/vouchers", orderVoucher);
app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server running!");
});
