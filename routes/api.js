const express = require("express");
const router = express.Router();
const Game = require("../models/Game");

router.get("/api/games", function(req, res){
  Game.find()
  .sort("year")
  .then( function(games){
    res.json( { games: games })
  })
})

router.get("/api/games/:id", function(req, res){
  Game.findOne({"_id": req.params.id})
  .then( function(game){
    res.json(game)
  })
})

module.exports = router;
