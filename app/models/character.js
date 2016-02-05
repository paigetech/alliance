// thing mongoose model - needs to be populated or removed
var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
  user: {
    type: String
  },
  name: {
    type: String,
    default: "title"
  },
  pcClass: {
    type: String,
    default: "author"
  },
  race: {
    type: String,
    default: "body"
  }
});

module.exports = mongoose.model('Character', characterSchema);
