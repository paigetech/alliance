// thing mongoose model - needs to be populated or removed
var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
  "characterName": String,
    "weaponSkills":{
      "weaponproficiency": Number,
      "parry": Number,
      "assasinate": Number,
      "backattack": Number,
      "backstab": Number,
      "criticalattack": Number,
      "disarm": Number,
      "dodge": Number,
      "evade": Number,
      "eviscerate": Number,
      "riposte": Number,
      "shatter": Number,
      "slay": Number,
      "stunlimb": Number,
      "terminate": Number,
      "waylay": Number 
      },
    "earth":{
      "1": Number,
      "2": Number,
      "3": Number,
      "4": Number,
      "5": Number,
      "6": Number,
      "7": Number,
      "8": Number,
      "9": Number,
      "1 Number": Number
      },
    "celestial":{
      "1": Number,
      "2": Number,
      "3": Number,
      "4": Number,
      "5": Number,
      "6": Number,
      "7": Number,
      "8": Number,
      "9": Number,
      "1 Number": Number
      },
    "weapons":{
      "archery": Boolean,
      "oneHandedBlunt": Boolean,
      "oneHandedEdged": Boolean,
      "oneHandedMaster": Boolean,
      "polearm": Boolean,
      "smallWeapon": Boolean,
      "staff": Boolean,
      "thrownWeapon": Boolean,
      "twoHandedBlunt": Boolean,
      "twoHandedSword": Boolean,
      "twoHandedMaster": Boolean,
      "twoWeapons": Boolean,
      "florentine": Boolean,
      "weaponMaster": Boolean,
      "shield": Boolean,
      "styleMaster": Boolean
      },
    "scholarSkills":{
      "healingArts": Boolean,
      "firstAid": Boolean,
      "readWrite": Boolean,
      "readMagic": Boolean,
      "earthPrimary": Boolean,
      "celestialPrimary": Boolean
      },
    "crafts":{
      "alchemy": Number,
      "blacksmith": Number,
      "createPotion": Number,
      "createScroll": Number,
      "createTrap": Number,
      "teacher": Number,
      "wearExtraArmor": Number,
      "legerdermain": Boolean,
      "merchant": Boolean,
      "herbalLore": Boolean
      },
    "racials":{
      "breakCommand": Number,
      "claws": Number,
      "gypsyCurse": Number,
      "racialAssasinate": Number,
      "resistBinding": Number,
      "resistCommand": Number,
      "resistElement": Number,
      "resistFear": Number,
      "resistMagic": Number,
      "resistNecromancy": Number,
      "resistPoison": Number,
      "racialDodge": Boolean,
      "racialSlay": Boolean,
      "racialProficiency": Boolean
      },
    "races": String,
    "pcClass": String
});

module.exports = mongoose.model('Character', characterSchema);
