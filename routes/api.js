const express = require("express");
const router = express.Router();
const Game = require("../models/Game");
const apiAuthMiddleware = require("../middleware/apiAuth");

router.get("/api/games",apiAuthMiddleware, function(req, res){
  const queryObject = {};
  if (req.query.name){
    // queryObject.name = req.query.name;
    // Instead of ^ we want to search substring
    // We'll do that with a "Regular Expression"
    // "i" means case _in_sensitive
    queryObject.name = new RegExp(req.query.name, 'i');
  }
  if (req.query.year){
    queryObject.year = req.query.year;
  }


  Game.find(queryObject)
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


router.post("/api/games", apiAuthMiddleware, function(req, res){

  const game = new Game()
  game.name = req.body.name;
  game.imageUrl = req.body.imageUrl;
  game.year = req.body.year;
  game.link = req.body.link;
  game.save()
  .then( function(game){
    res.status(201).json(game)
  })
  .catch( function(validationError){
    res.status(422).json(validationError)
  })
})

module.exports = router;
