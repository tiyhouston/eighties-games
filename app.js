const express = require("express");
const mustache = require("mustache-express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");

app.engine('mustache', mustache());
app.set("view engine", 'mustache');
app.listen(3000, function(){
  console.log("hi")
})
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

app.use(routes);
