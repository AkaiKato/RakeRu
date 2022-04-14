var User = require("../models/user"),
    UsersController = {},
    path = require('path'),
    mongoose = require("mongoose");

var staticPath = path.join(__dirname, "public");

UsersController.create = function(req, res) {
    var email = req.body.email;
    User.find({ "email": email }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            return res.json({ 'alert': 'Такой email уже зарегистрирован в системе' });
        } else {
            var newUser = new User({
                "name": req.body.name,
                "email": req.body.email,
                "password": req.body.password,
                "seller": req.body.seller
            });
            newUser.save(function(err, result) {
                console.log(err);
                if (err !== null) {
                    res.json(500, err);
                } else {
                    res.json(200, result);
                    console.log(result);
                }
            });
        }
    });
};

module.exports = UsersController;