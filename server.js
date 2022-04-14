const { redirect } = require("express/lib/response");

var express = require("express"),
    http = require("http"),
    path = require('path'),
    app = express(),
    mongoose = require("mongoose"),
    UsersController = require("./controllers/user_controller")

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


//404

app.get('/404', (req, res) => {
    res.sendFile(path.join(staticPath, "404.html"))
});
app.use((req, res) => {
    res.redirect('/404');
});


http.createServer(app).listen(3000);