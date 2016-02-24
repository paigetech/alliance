var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  User : {
    type: String,
    default : ""
  },
  Character : {
    type: String,
    default: ""
  },
  User : String,
  Character : String,
  MIID : String,
  RepID : String,
  ItemType : String,
  PhysRepDesc : String,
  Restriction : String,
  Flaw : String,
  Notes : String,
  RitualEffect : String,
  Uses : Number,
  Aspect : String,
  Type : String,
  Expiration : Date,
  date: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Item', itemSchema);
