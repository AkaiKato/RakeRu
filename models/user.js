var mongoose = require("mongoose")

var UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    seller: Boolean
});

var User = mongoose.model("User", UserSchema);
module.exports = User;