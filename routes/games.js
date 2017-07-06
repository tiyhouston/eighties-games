const express = require("express");
const router = express.Router();
const Game = require("../models/Game");
const years = [];
for(let i=1980; i<1990; i++){
  years.push(i);
}

router.get("/games/new", function(req, res){
  res.render("games/new", {
    years: years
  })
})

router.post("/games", function(req, res){

  const game = new Game()
  game.name = req.body.name;
  game.imageUrl = req.body.imageUrl;
  game.year = req.body.year;
  game.link = req.body.link;
  game.save()
  .then( function(game){
    res.json(game)
  })
  .catch( function(validationError){
    res.render("games/new", {
      game: game,
      validationError: validationError,
      years: years
    })
  })
})

router.get("/games/:id/edit", function(req,res){

  Game.findOne({"_id": req.params.id})
  .then(function(game){
    res.render("games/edit", {
      game: game,
      years: years
    })
  })
})

router.post("/games/:id", function(req,res){

  Game.findOne({"_id": req.params.id})
  .then( function(game){
    game.name = req.body.name;
    game.imageUrl = req.body.imageUrl;
    game.year = req.body.year;
    game.link = req.body.link;
    game.save()
    .then( function(game){
      res.redirect("/")
    })
  })
})

module.exports = router;
