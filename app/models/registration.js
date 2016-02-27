var mongoose = require('mongoose');

var registrationSchema = mongoose.Schema({
  user: {
    type: String
  },
  character: {
    type: String
  },
  item: {},
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

module.exports = mongoose.model('Reg', registrationSchema);
