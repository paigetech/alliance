var mongoose = require ('mongoose');

var craftSchema = mongoose.Schema({
  user: String,
  totalCost: {
    type: Number,
    default: 0
  },
  scrolls: [],
  potions: [],
  weapons: [],
  alchemyContact: [],
  alchemyElixir: [],
  alchemyGas: [],
  alchemyWeapon: [],
  trapsGas:[],
  trapsNoisemaker: [],
  trapsWeapon: [],
  trapsFlameAcid: [],
  trapsExplosive: [],
  trapsMechanical: [],
  armor: [],
  hidden: Boolean
});

module.exports = mongoose.model('Craft', craftSchema);
