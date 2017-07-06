const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {type: String, required: true},
  imageUrl: {type: String, required: true},
  tags: [String],
  year: {type: Number, required: true},
  link: {type: String, required: true}
})

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
