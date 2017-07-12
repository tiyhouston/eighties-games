const express = require("express");
const mustache = require("mustache-express");
const bodyParser = require("body-parser");
const app = express();
const homepageRoutes = require("./routes/homepage");
const gamesRoutes = require("./routes/games");
const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");
const mongoose = require('mongoose');
const session = require('express-session')
const authMiddleware = require("./middleware/auth");

app.engine('mustache', mustache());
app.set("view engine", 'mustache');
app.set("layout", 'layout');
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'jworules',
  cookie: {},
  resave: true,
  saveUninitialized: true
}))
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/eighties');

app.get('/', authMiddleware, function(req, res){
  res.render("index")
})

app.use(gamesRoutes);
app.use(apiRoutes);
app.use(authRoutes);


app.listen(3000, function(){
  console.log("hi")
})

module.exports = app;
