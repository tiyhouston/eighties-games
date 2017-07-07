const express = require("express");
const router = express.Router();
const Game = require("../models/Game")

router.get('/', function(req, res){
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
    res.render("index", {
      games: games,
      searchName: req.query.name,
      searchYear: req.query.year
    })
  })
})

module.exports = router;
