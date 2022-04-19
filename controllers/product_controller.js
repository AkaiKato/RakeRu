var Product = require("../models/products"),
    fileUpload = require('express-fileupload'),
    ProductController = {},
    path = require('path'),
    mongoose = require("mongoose");


ProductController.create = function(req, res) {
    var name = req.body.name;
    Product.find({ "name": name }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            return res.json({ 'alert': 'Такой продукт уже есть в системе' });
        } else {
            var newProduct = new Product({
                "name": req.body.name,
                "img": req.body.img,
                "totalLength": req.body.totalLength,
                "width": req.body.width,
                "cuttingMaterial": req.body.cuttingMaterial,
                "materialWorkingPart": req.body.materialWorkingPart,
                "lengthWorkingPart": req.body.lengthWorkingPart,
                "actualPrice": req.body.actualPrice,
                "discount": req.body.discount,
                "sellPrice": req.body.sellPrice,
                "email": req.body.email.join()
            });
            newProduct.save(function(err, result) {
                console.log(err);
                if (err !== null) {
                    res.json(500, err);
                } else {

                    console.log(result);
                }
            });
            res.json(200, result);
            console.log("YYYYYYYYYYYYYYYYY");
        }
    });
};

module.exports = ProductController;