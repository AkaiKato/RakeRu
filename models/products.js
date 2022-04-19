var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: String,
    img: String,
    totalLength: Number,
    width: Number,
    cuttingMaterial: String,
    materialWorkingPart: String,
    lengthWorkingPart: Number,
    actualPrice: Number,
    discount: Number,
    sellPrice: Number,
    email: String
});

var Product = mongoose.model("Product", ProductSchema);
module.exports = Product;