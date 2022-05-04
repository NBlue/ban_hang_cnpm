const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String, required: true },
        img: { type: String, required: true },
        categories: { type: String, required: true },
        size: { type: Array, default: ["S", "M", "L"] },
        color: { type: Array, default: ["pink", "white"] },
        price: { type: Number, required: true },
        inStock: { type: Boolean, default: true }, //con hang
    },
    { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);
