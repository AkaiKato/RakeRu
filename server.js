const res = require("express/lib/response");

var express = require("express"),
    http = require("http"),
    path = require('path'),
    app = express(),
    mongoose = require("mongoose"),
    UsersController = require("./controllers/user_controller"),
    SellerController = require("./controllers/seller_controller"),
    ProductController = require("./controllers/product_controller")

var staticPath = path.join(__dirname, "public");

app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded());
mongoose.connect('mongodb://localhost/RakeRu', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    console.log("DB Connected!")
}).catch(err => {
    console.log(Error, err.message);
});


//home

app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
});

//signup

app.get("/signup", (req, res) => {
    res.sendFile(path.join(staticPath, "signup.html"))
});

app.post("/signup", function(req, res) {
    var bb = req.body;
    if (bb.name.length < 2) {
        return res.json({ 'alert': "Имя должно состоять минимум из 2 букв " });
    } else if (!bb.email.length) {
        return res.json({ 'alert': 'Введите свой email' });
    } else if (bb.password.length < 8) {
        return res.json({ 'alert': 'Пароль должен быть как минимум 8 символов' });
    } else if (bb.UA === 'false') {
        return res.json({ 'alert': 'Вы должны согласиться с пользовательским соглашением' });
    } else {
        UsersController.create(req, res);
    }
});

//login

app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "login.html"))
});

app.post("/login", function(req, res) {
    var bb = req.body;
    if (!bb.email.length || !bb.password.length) {
        return res.json({ 'alert': 'Введите свои данные' });
    } else {
        UsersController.login(req, res);
    }
});

//seller

app.get('/seller', (req, res) => {
    res.sendFile(path.join(staticPath, "seller.html"))
});

app.post('/seller', (req, res) => {
    var bb = req.body;
    if (!bb.name.length || !bb.adress.length || !bb.about.length) {
        return res.json({ 'alert': 'Заполните все поля!' })
    } else if (bb.UA === 'false') {
        return res.json({ 'alert': 'Вы должны согласиться с пользовательским соглашением' });
    } else {
        SellerController.create(req, res);
    }
})

//add-product

app.get('/add-product', (req, res) => {
    res.sendFile(path.join(staticPath, "addProduct.html"))
});

app.get('/add-product/:name', (req, res) => {
    res.sendFile(path.join(staticPath, "addProduct.html"))
});

app.post('/add-product-change', (req, res) => {
    ProductController.change(req, res);
});

app.post('/add-product', (req, res) => {
    var bb = req.body;
    if (!bb.name.length || !bb.totalLength.length || !bb.width.length || !bb.cuttingMaterial.length || !bb.materialWorkingPart.length || !bb.lengthWorkingPart.length || !bb.actualPrice.length || !bb.discount.length || !bb.sellPrice.length) {
        return res.json({ 'alert': 'Заполните все поля!' })
    } else {
        ProductController.create(req, res);
    }
})

//get-product

app.get('/product/:name', (req, res) => {
    res.sendFile(path.join(staticPath, "product.html"))
})

app.post('/get-product', (req, res) => {
    ProductController.get(req, res);
})

app.post('/get-product-change', (req, res) => {
    ProductController.getChange(req, res);
})

app.post('/get-product-one', (req, res) => {
    ProductController.getOne(req, res);
})

app.post('/get-product-all', (req, res) => {
    ProductController.getAll(req, res);
})

app.post('/get-product-type', (req, res) => {
    ProductController.getType(req, res);
})

app.post('/get-product-name', (req, res) => {
    ProductController.getName(req, res);
})


//del-product

app.post('/del-product', (req, res) => {
    ProductController.delete(req, res);
})

//policy and UA

app.get('/policy', (req, res) => {
    res.sendFile(path.join(staticPath, "policy.html"))
})

app.get('/UA', (req, res) => {
    res.sendFile(path.join(staticPath, "UA.html"))
})

//search

app.get('/search', (req, res) => {
    res.sendFile(path.join(staticPath, "search.html"))
})

app.get('/search/:name', (req, res) => {
    res.sendFile(path.join(staticPath, "search.html"))
})

//404

app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"))
});
app.use((req, res) => {
    res.redirect('/404');
});


http.createServer(app).listen(3000);