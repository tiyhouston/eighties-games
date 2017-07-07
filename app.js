const express = require("express");
const mustache = require("mustache-express");
const bodyParser = require("body-parser");
const app = express();
const homepageRoutes = require("./routes/homepage");
const gamesRoutes = require("./routes/games");
const apiRoutes = require("./routes/api");
const mongoose = require('mongoose');

app.engine('mustache', mustache());
app.set("view engine", 'mustache');
app.set("layout", 'layout');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/eighties');

app.use(homepageRoutes);
app.use(gamesRoutes);
app.use(apiRoutes);

app.listen(3000, function(){
  console.log("hi")
})
