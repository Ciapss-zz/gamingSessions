// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const systemSchema = new Schema({
  title: {type: String, required: true},
});

// the schema is useless so far
// we need to create a model using it
const System = mongoose.model('System', systemSchema);


// make this available to our users in our Node applications
module.exports = System;