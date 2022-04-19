var mongoose = require("mongoose")

var SellerSchema = mongoose.Schema({
    name: String,
    adress: String,
    about: String,
    email: String
});

var Seller = mongoose.model("Seller", SellerSchema);
module.exports = Seller;