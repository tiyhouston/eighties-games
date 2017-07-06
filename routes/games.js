const express = require("express");
const router = express.Router();
const Game = require("../models/Game");

function buildYears(currentlySelectedYear){
  const years = [];
  for(let i=1980; i<1990; i++){
    const yearObject = {
      year: i,
      selected: (i === currentlySelectedYear)
    }
    years.push(yearObject)
  }
  return years;
}


router.get("/games/new", function(req, res){
  res.render("games/new", {
    years: buildYears()
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
      years: buildYears(game.year)
    })
  })
})

router.get("/games/:id/edit", function(req,res){

  Game.findOne({"_id": req.params.id})
  .then(function(game){
    res.render("games/edit", {
      game: game,
      years: buildYears(game.year)
    })
  })
})

router.post("/games/:id", function(req,res){

  const years = buildYears(game.year);

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
    .catch( function(validationError){
      res.render("games/edit", {
        game: game,
        validationError: validationError,
        years: buildYears(game.year)
      })
    })

  })
})

module.exports = router;
