var mongoose = require('mongoose');

var boardSchema = mongoose.Schema({
  user : String,
  character : String,
  name : String,
  celestial : [],
  earth : [],
  highMagic : [],
  date: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Board', boardSchema);
