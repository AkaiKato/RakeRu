const { Console } = require("console");

var Seller = require("../models/seller"),
    SellerController = {},
    path = require('path'),
    User = require("../models/user"),
    mongoose = require("mongoose");


SellerController.create = function(req, res) {
    var name = req.body.name;
    console.log(name);
    Seller.find({ "name": name }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            return res.json({ 'alert': 'Такая компания уже зарегистрована в системе' });
        } else {
            var newSeller = new Seller({
                "name": req.body.name,
                "adress": req.body.adress,
                "about": req.body.about,
                "email": req.body.email.join()
            });
            newSeller.save(function(err, result) {
                console.log(err);
                if (err !== null) {
                    res.json(500, err);
                } else {
                    var newStatus = true;
                    User.findOneAndUpdate({ "email": req.body.email.join() }, { "seller": true }, { new: true }, function(errr, ress) {
                        if (err) {
                            res.send(500, errr);
                        } else {
                            res.json(200, result);
                            console.log("PERFECT")
                        }
                    })

                    console.log(result);
                }
            });
        }
    });
};

module.exports = SellerController;