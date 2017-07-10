const express = require("express");
const router = express.Router();
const Game = require("../models/Game")
const User = require("../models/User")

router.get('/', function(req, res){
  res.render("index")
})

module.exports = router;
