var Product = require("../models/products"),
    ProductController = {},
    path = require('path'),
    mongoose = require("mongoose");


ProductController.create = function(req, res) {
    var name = req.body.name;
    console.log(name)
    Product.find({ "name": name }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            return res.json({ 'alert': 'Такой продукт уже есть в системе' });
        } else {
            var newProduct = new Product({
                "name": req.body.name,
                "type": req.body.type,
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
        }
    });
};

ProductController.get = function(req, res) {
    var email = req.body.email;
    Product.find({ "email": email }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            console.log(result);
            res.json(200, result)
        } else {
            res.json({ 'alertNP': 'no products' })
        }
    });
}

ProductController.getOne = function(req, res) {
    var name = req.body.name;
    Product.find({ "name": name }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else {
            console.log(result);
            res.json(200, result)
        }
    });
}

ProductController.getAll = function(req, res) {
    Product.find({}, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else {
            console.log(result);
            res.json(200, result)
        }
    });
}

ProductController.getChange = function(req, res) {
    var email = req.body.email;
    var name = req.body.name;
    Product.find({ "email": email, "name": name }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            console.log(result);
            res.json(200, result)
        } else {
            res.json({ 'alertNP': 'no products' })
        }
    });
}

ProductController.change = function(req, res) {
    var id = req.body.id.join();
    Product.findOneAndUpdate
    Product.findOneAndUpdate({ "_id": id }, { "name": req.body.name, "type": req.body.type, "img": req.body.img, "totalLength": req.body.totalLength, "width": req.body.width, "cuttingMaterial": req.body.cuttingMaterial, "materialWorkingPart": req.body.materialWorkingPart, "lengthWorkingPart": req.body.lengthWorkingPart, "actualPrice": req.body.actualPrice, "discount": req.body.discount, "sellPrice": req.body.sellPrice }, { new: true }, function(errr, ress) {
        if (errr) {
            res.send(500, errr)
        } else {
            res.json(200, ress);
        }
    })
}

ProductController.getType = function(req, res) {
    var type = req.body.type;
    Product.find({ "type": type }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            console.log(result);
            res.json(200, result)
        } else {
            res.json({ 'alertNP': 'no products' })
        }
    });
}

ProductController.getName = function(req, res) {
    var name = req.body.name;
    Product.find({ "name": { "$regex": name } }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            console.log(result);
            res.json(200, result)
        } else {
            res.json({ 'alertNP': 'no products' })
        }
    });
}

ProductController.delete = function(req, res) {
    var name = req.body.name;
    console.log(name);
    Product.find({ "name": name }).remove().exec();
    console.log('PROSHEL');
    res.json('success')
}

module.exports = ProductController;