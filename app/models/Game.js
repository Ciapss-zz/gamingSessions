// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const gameSchema = new Schema({
  title: {type: String, required: true},
  img: {type: String, required: true},
});

// the schema is useless so far
// we need to create a model using it
const Game = mongoose.model('Game', gameSchema);


// make this available to our users in our Node applications
module.exports = Game;