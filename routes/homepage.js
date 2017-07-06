const express = require("express");
const router = express.Router();
const Game = require("../models/Game")

router.get('/', function(req, res){
  Game.find()
  .sort("year")
  .then( function(games){
    res.render("index", {
      games: games
    })
  })
})

module.exports = router;
