var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  user : String,
  character : String,
  MIID : String,
  repID : String,
  itemType : String,
  physRepDesc : String,
  restriction : String,
  flaw : String,
  notes : String,
  ritualEffect : String,
  uses : Number,
  aspect : String,
  type : String,
  expiration : Date,
  date: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Item', itemSchema);
