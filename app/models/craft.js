var mongoose = require ('mongoose');

var craftSchema = mongoose.Schema({
  user: {
    type: String
  },
  title: {
    type: String,
    default: "title"
  }
});


module.exports = mongoose.model('Craft', craftSchema);
