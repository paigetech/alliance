// thing mongoose model - needs to be populated or removed
var mongoose = require('mongoose');

var thingSchema = mongoose.Schema({
  user: {
    type: String
  },
  title: {
    type: String,
    default: "title"
  },
  author: {
    type: String,
    default: "author"
  },
  body: {
    type: String,
    default: "body"
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  hidden: Boolean,
});

module.exports = mongoose.model('Thing', thingSchema);
