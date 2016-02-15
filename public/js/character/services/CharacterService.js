app.service('Character', function () {
  //example
    this.invalidMessage = "";
    this.build = {};
    this.build.characterName = "Panda";
    this.build.weaponSkills = {
      weaponproficiency: 0,
      parry: 0,
      assasinate: 0,
      backattack: 0,
      backstab: 0,
      criticalattack: 0,
      disarm: 0,
      dodge: 0,
      evade: 0,
      eviscerate: 0,
      riposte: 0,
      shatter: 0,
      slay: 0,
      stunlimb: 0,
      terminate: 0,
      waylay: 0
    };
    this.build.earth = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0
    };
    this.build.celestial = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0
    };
    this.build.weapons = {
      archery: false,
      oneHandedBlunt: false,
      oneHandedEdged: false,
      oneHandedMaster: false,
      polearm: false,
      smallWeapon: false,
      staff: false,
      thrownWeapon: false,
      twoHandedBlunt: false,
      twoHandedSword: false,
      twoHandedMaster: false,
      twoWeapons: false,
      florentine: false,
      weaponMaster: false,
      shield: false,
      styleMaster: false
    }
    this.build.scholarSkills  = {
      healingArts: false,
      firstAid: false,
      readWrite: false,
      readMagic: false,
      earthPrimary: false,
      celestialPrimary: false
    }
    this.build.crafts = {
      alchemy: 0,
      blacksmith: 0,
      createPotion: 0,
      createScroll: 0,
      createTrap: 0,
      teacher: 0,
      wearExtraArmor: 0,
      legerdermain: false,
      merchant: false,
      herbalLore: false
    }
    this.build.racials = {
      breakCommand: 0,
      claws: 0,
      gypsyCurse: 0,
      racialAssasinate: 0,
      resistBinding: 0,
      resistCommand: 0,
      resistElement: 0,
      resistFear: 0,
      resistMagic: 0,
      resistNecromancy: 0,
      resistPoison: 0,
      racialDodge: false,
      racialSlay: false,
      racialProficiency: false
    }
    this.build.races = "human";
    this.build.pcClass = "fighter"; 
    this.changeCount = 0;
    this.invalid = {};
    this.formInvalid = false;
    this.cost = 0;
    
    this.custom = true;
    this.toggleHide = function() {
        this.hide = this.hide === false ? true: false;
    };
  
    this.change = 0;

    this.totalCost = function(build){
      cost = 0;
      pcClass = this.build.pcClass;
      //take the build object and pull ref out of the cost obj the multiply
      for (var key in build) {
        //check for earth/celestial

        if (build.hasOwnProperty(key)) {
          if (key === "earth" ) {

            //use the spell cost section
            var obj = build[key]
            for (var ref in obj) {

             level = ref;
             amount = obj[ref];
             skillCost = costs["spells"][level][pcClass]
             if (this.build.scholarSkills.earthPrimary === true) {
               cost += skillCost * amount;
             } else {
               cost += skillCost * amount * 2;
             }

            }

          } else if ( key === "celestial") {

            //use the spell cost section
            var obj = build[key]
            for (var ref in obj) {

             level = ref;
             amount = obj[ref];
             skillCost = costs["spells"][level][pcClass]
             if (this.build.scholarSkills.celestialPrimary === true) {
               cost += skillCost * amount;
             } else {
               cost += skillCost * amount * 2;
             }
            }

          } else {
            //use the regular cost calc
            var obj = build[key]
            for (var ref in obj) {
              //key is the skill, obj[key] is the amount
              //if skill is in the costs chart
                amount = obj[ref];
                skill = ref;
              if (costs[skill]) {
                skillCost = costs[skill][pcClass];
                cost += skillCost * amount;
              } else {
              //  //console.log("NOT in costs: " + skill);
                //earthPrimary and cPrimary causing problems
                //probably need to seperate build costing skills from character "traits" like race/class etc.
              }
            }
          }
        }
      }
      return cost;
    }
    //need to adjust for null
    this.spellsValid = function(spells){
      
      for (var key in spells) {
        if (spells[key] === 0 || spells[key] === null || spells[key] === "") {
          this.invalid[key] = false;
        }
        if (spells[key] > 0 && spells[key] < 10) {
          this.levelDif = (Number(spells[key-1]) - Number(spells[key]));
          if( this.levelDif > 2 ) {
            this.invalid[(key - 1)] = true;
            this.invalidMessage += "spell level dif > 2 ";
          
          }
          //need a special check to reset level 1 once valid
          if( this.levelDif <= 2 ) {
            this.invalid[(key - 1)] = false;
          }
          //things are below 4
          if( spells[key - 1] < 4){
            if(spells[key] >= spells[key -1]) {
              this.invalid[String(key)] = true;
              this.invalidMessage += "spell things are below 4 ";
            } else {
              this.invalid[key] = false;
            }
            
          }
          //things are above 4
          if( spells[key - 1] >= 4){
            if(spells[key] > spells[key -1]) {
              this.invalid[key] = true;
              this.invalidMessage += "spell things are above 4 ";
            } else {
              this.invalid[key] = false;
            }
          }
        }
        if (spells[key] === 10) {
        //formal check
          if (spells['9'] < 1 && spells[10] > 0) {
            this.invalid[10] = true;
            this.invalidMessage += "spell no 9th for formal ";
          }
        }
      }
    }
    
    this.weaponSkillsValid = function(skills){
      //fighter skills
      //eviscerate
      if (skills.eviscerate >= 1 && skills.weaponproficiency/skills.eviscerate < 4) {
        this.invalid.eviscerate = true;
        this.invalidMessage += "weapon skill not enough porffs for this eviscerate ";
      } else { this.invalid.eviscerate = false; }
      //slay
      if (skills.slay >= 1 && skills.weaponproficiency/skills.slay < 2) {
        this.invalid.slay = true;
        this.invalidMessage += "weapon skill not enough profs for this slay ";
      } else { this.invalid.slay = false; }
      //parry
      if (skills.parry >= 1 && skills.weaponproficiency/skills.parry < 2) {
        this.invalid.parry = true;
        this.invalidMessage += "weapon skill not enough profs for this parry";
      } else { this.invalid.parry = false; }
      
      //rogue skills
      //assasinate
      if (skills.assasinate >= 1 && skills.backstab/skills.assasinate < 2) {
        this.invalid.assasinate = true;
        this.invalidMessage += "not enough backstabs for this assasinate ";
      } else { this.invalid.assasinate = false; }
      //dodge
      if (skills.dodge >= 1 && skills.backstab/skills.dodge < 2) {
        this.invalid.dodge = true;
        this.invalidMessage += "not enough backstabs for this dodge ";
      } else { this.invalid.dodge = false; }
      //evade
      if (skills.evade >= 1 && skills.backstab/skills.evade < 1) {
        this.invalid.evade = true;
        this.invalidMessage += "not enough backstabs for this evade ";
      } else { this.invalid.evade = false; }
      //terminate
      if (skills.terminate >= 1 && skills.backstab/skills.terminate < 4) {
        this.invalid.terminate = true;
        this.invalidMessage += "not enough backstabs for this terminate ";
      } else { this.invalid.terminate = false; }
      
      //combine skills
      //disarm
      if (skills.disarm >= 1 && (skills.weaponproficiency + skills.backstab)/skills.disarm < 1) {
        this.invalid.disarm = true;
        this.invalidMessage += "weapon skill not enough backstabs/profs for this disarm ";
      } else { this.invalid.disarm = false; }
      //shatter - does not work with scout loggic ATM
      if (skills.shatter >= 1 && ((skills.weaponproficiency/3)+(skills.backstab/3))/skills.shatter < 1) {
        this.invalid.shatter = true;
        this.invalidMessage += "weapon skill not enough backstabs/profs for this shatter";
      } else { this.invalid.shatter = false; }
      //stunlimb - does not work with scout loggic ATM
      if (skills.stunlimb >= 1 && ((skills.weaponproficiency/3)+(skills.backstab/3))/skills.stunlimb < 1) {
        this.invalid.stunlimb = true;
        this.invalidMessage += "weapon skill not enough backstabs/profs for this stunlimb";
      } else { this.invalid.stunlimb = false; }
      //riposte - does not work with scout loggic ATM
      if (skills.riposte >= 1 && ((skills.weaponproficiency/4)+(skills.backstab/4))/skills.riposte < 1) {
        this.invalid.riposte = true;
        this.invalidMessage += "weapon skill not enough backstabs/profs for this riposte ";
      } else { this.invalid.riposte = false; }
    }
    
    this.weaponsValid = function(skills){
      if (skills.twoWeapons === true && skills.florentine === false){
        this.invalid.twoWeapons = true;
        this.invalidMessage += "weapons not the right prereqs for two weapon ";
      } else {
        this.invalid.twoWeapons = false;
      }
      //maybe add a disable here
      if (skills.oneHandedMaster === true) {
        skills.oneHandedBlunt = false;
        skills.oneHandedEdged = false;
        skills.smallWeapon = false;
      }
      if (skills.twoHandedMaster === true) {
        skills.staff = false;
        skills.polearm = false;
        skills.twoHandedSword = false;
        skills.twoHandedBlunt = false;
      }
      if (skills.weaponMaster === true) {
        skills.oneHandedBlunt = false;
        skills.oneHandedEdged = false;
        skills.oneHandedMaster = false;
        skills.smallWeapon = false;
        skills.staff = false;
        skills.polearm = false;
        skills.twoHandedSword = false;
        skills.twoHandedBlunt = false;
        skills.twoHandedMaster = false;
      }
      if (skills.styleMaster === true) {
        skills.twoWeapons = false;
        skills.florentine = false;
        skills.shield = false;
      }
    }
    
    this.scholarSkillsValid = function(skills){
      if (skills.readMagic === true && skills.readWrite === false){
        this.invalid.readMagic = true;
        this.invalidMessage += "prereqs not the right prereqs for read magic ";
      } else {
        this.invalid.readMagic = false;
      }
      if (skills.healingArts === true && skills.readWrite === false){
        this.invalid.healingArts = true;
        this.invalidMessage += "prereqs not the right prereqs for healing arts ";
      } else {
        this.invalid.healingArts = false;
      }
    }
    
    this.craftsValid = function(skills){
      if(skills.alchemy > 0 && skills.herbalLore === false){
        this.invalid.alchemy = true;
        this.invalidMessage += "prereqs not the right prereqs for alchemy ";
      } else {
        this.invalid.alchemy = false;
      }
      if(skills.createTrap > 0 && skills.legerdermain === false){
        this.invalid.createTrap = true;
        this.invalidMessage += "prereqs not the right prereqs for create trap ";
      } else {
        this.invalid.createTrap = false;
      }
      if(skills.herbalLore > 0 && this.build.scholarSkills.readWrite === false){
        this.invalid.herbalLore = true;
        this.invalidMessage += "prereqs not the right prereqs for herbal lore ";
      } else {
        this.invalid.herbalLore = false;
      }
      if(skills.createPotion > 0 && this.earth[1] < 1){
        this.invalid.createPotion = true;
        this.invalidMessage += "prereqs not the right prereqs for create Potion ";
      } else {
        this.invalid.createPotion = false;
      }
      if(skills.createScroll > 0 && this.celestial[1] < 1){
        this.invalid.createScroll = true;
        this.invalidMessage += "prereqs not the right prereqs for create scroll ";
      } else {
        this.invalid.createScroll = false;
      }
    }
    
    this.racialsValid = function(skills){
      if(skills.breakCommand > 0){
        if ( this.build.races === "biata" || this.build.races === "mysticWoodElf" || this.build.races === "stoneElf" || this.build.races === "wylderkin"){
          this.invalid.breakCommand = false;
        } else {
          this.invalid.breakCommand = true;
          this.invalidMessage += "wrong race for break Command ";
        } 
      } else { this.invalid.breakCommand = false; }
      if(skills.claws > 0){
        if ( this.build.races === "sarr" || this.build.races === "wylderkin"){
          this.invalid.claws = false;
        } else {
          this.invalid.claws = true;
          this.invalidMessage += "wrong race for break claws ";
        } 
      } else { this.invalid.claws = false; }
      if(skills.gypsyCurse > 0){
        if ( this.build.races === "gypsy" || this.build.races === "wylderkin"){
          this.invalid.gypsyCurse = false;
        } else {
          this.invalid.gypsyCurse = true;
          this.invalidMessage += "wrong race for break gypsy curse ";
        } 
      } else { this.invalid.gypsyCurse = false; }
      if(skills.racialAssasinate > 0){
        if ( this.build.races === "sarr" || this.build.races === "wylderkin"){
          this.invalid.racialAssasinate = false;
        } else {
          this.invalid.racialAssasinate = true;
          this.invalidMessage += "wrong race for break racial assasinate ";
        } 
      } else { this.invalid.racialAssasinate = false; }
      if(skills.resistBinding > 0){
        if ( this.build.races === "dryad" || this.build.races === "wylderkin"){
          this.invalid.resistBinding = false;
        } else {
          this.invalid.resistBinding = true;
          this.invalidMessage += "wrong race for break resist binding ";
        } 
      } else { this.invalid.resistBinding = false; }
      if(skills.resistCommand > 0){
        if ( this.build.races === "biata" || this.build.races === "darkElf" || this.build.races === "elf" || this.build.races === "mysticWoodElf" || this.build.races === "stoneElf" || this.build.races === "wylderkin"){
          this.invalid.resistCommand = false;
        } else {
          this.invalid.resistCommand = true;
          this.invalidMessage += "wrong race for break resist command ";
        } 
      } else { this.invalid.resistCommand = false; }
      if(skills.resistElement > 0){
        if ( this.build.races === "barbarian" || this.build.races === "dwarf" || this.build.races === "wylderkin"){
          this.invalid.resistElement = false;
        } else {
          this.invalid.resistElement = true;
          this.invalidMessage += "wrong race for break resist element ";
        } 
      } else { this.invalid.resistElement = false; }
      if(skills.resistFear > 0){
        if ( this.build.races === "barbarian" || this.build.races === "highOrc" || this.build.races === "wylderkin"){
          this.invalid.resistFear = false;
        } else {
          this.invalid.resistFear = true;
          this.invalidMessage += "wrong race for break resist fear ";
        } 
      } else { this.invalid.resistFear = false; }
      if(skills.resistMagic > 0){
        if ( this.build.races === "darkElf" || this.build.races === "wylderkin"){
          this.invalid.resistMagic = false;
        } else {
          this.invalid.resistMagic = true;
          this.invalidMessage += "wrong race for break resist magic ";
        } 
      } else { this.invalid.resistMagic = false; }
      if(skills.resistNecromancy > 0){
        if ( this.build.races === "highOgre" || this.build.races === "wylderkin"){
          this.invalid.resistNecromancy = false;
        } else {
          this.invalid.resistNecromancy = true;
          this.invalidMessage += "wrong race for break resist Necromancy ";
        } 
      } else { this.invalid.resistNecromancy = false; }
      if(skills.resistPoison > 0){
        if ( this.build.races === "dwarf" || this.build.races === "hobbling" || this.build.races === "sarr" || this.build.races === "wylderkin"){
          this.invalid.resistPoison = false;
        } else {
          this.invalid.resistPoison = true;
          this.invalidMessage += "wrong race for break resist poison ";
        } 
      } else { this.invalid.resistPoison = false; }
      if(skills.racialDodge === true){
        if ( this.build.races === "hobling" || this.build.races === "wylderkin"){
          this.invalid.racialDodge = false;
        } else {
          this.invalid.racialDodge = true;
          this.invalidMessage += "wrong race for break racial dodge ";
        } 
      } else { this.invalid.racialDodge = false; }
      if(skills.racialSlay === true){
        if ( this.build.races === "highOrc" || this.build.races === "wylderkin"){
          this.invalid.racialSlay = false;
        } else {
          this.invalid.racialSlay = true;
          this.invalidMessage += "wrong race for break racial slay ";
        } 
      } else { this.invalid.racialSlay = false; }
      if(skills.racialProfficiency === true){
        if ( this.build.races === "highOrc" || this.build.races === "highOgre" || this.build.races === "wylderkin"){
          this.invalid.profficiency = false;
        } else {
          this.invalid.racialProfficiency = true;
          this.invalidMessage += "wrong race for break racial prof ";
        } 
      } else { this.invalid.racialProfficiency = false; }
    }


    this.invalidCheck = function() {
      this.invalid.message = this.invalidMessage;
      return this.invalid;
    };

    
    costs = {
      alchemy: { 
        fighter: 6,
        scout:   6,
        rogue:   3,
        adept:   4,
        scholar: 4,
        templar: 6,
        artisan: 3
      },
      blacksmith: {
        fighter: 3,
        scout:   3,
        rogue:   4,
        adept:   4,
        scholar: 4,
        templar: 3,
        artisan: 3
      },
      craftsman: {
        fighter: 2,
        scout:   2,
        rogue:   2,
        adept:   2,
        scholar: 2,
        templar: 2,
        artisan: 2
      },
      createPotion: {
        fighter: 6,
        scout:   6,
        rogue:   6,
        adept:   4,
        scholar: 3,
        templar: 4,
        artisan: 3
      },
      createScroll: {
        fighter: 6,
        scout:   6,
        rogue:   6,
        adept:   4,
        scholar: 3,
        templar: 4,
        artisan: 3
      },
      createTrap: {
        fighter: 6,
        scout:   4,
        rogue:   3,
        adept:   4,
        scholar: 6,
        templar: 6,
        artisan: 3
      },
      herbalLore: {
        fighter: 6,
        scout:   5,
        rogue:   3,
        adept:   4,
        scholar: 4,
        templar: 6,
        artisan: 3
      },
      legerdermain: {
        fighter: 10,
        scout:   8,
        rogue:   4,
        adept:   8,
        scholar: 10,
        templar: 10,
        artisan: 8
      },
      merchant: {
        fighter: 3,
        scout:   2,
        rogue:   1,
        adept:   2,
        scholar: 3,
        templar: 3,
        artisan: 1
      },
      teacher: {
        fighter: 1,
        scout:   1,
        rogue:   1,
        adept:   1,
        scholar: 1,
        templar: 1,
        artisan: 1
      },
      wearExtraArmor: {
        fighter: 1,
        scout:   1,
        rogue:   1,
        adept:   1,
        scholar: 1,
        templar: 1,
        artisan: 1
      },
      breakCommand: {
        fighter: 2,
        scout:   2,
        rogue:   2,
        adept:   2,
        scholar: 2,
        templar: 2,
        artisan: 2
      },
      claws: {
        fighter: 8,
        scout:   8,
        rogue:   8,
        adept:   8,
        scholar: 8,
        templar: 8,
        artisan: 8
      },
      gypsyCurse: {
        fighter: 2,
        scout:   2,
        rogue:   2,
        adept:   2,
        scholar: 2,
        templar: 2,
        artisan: 2
      },
      racialAssasinate: {
        fighter: 4,
        scout:   4,
        rogue:   4,
        adept:   4,
        scholar: 4,
        templar: 4,
        artisan: 4
      },
      racialDodge: {
        fighter: 10,
        scout:   10,
        rogue:   10,
        adept:   10,
        scholar: 10,
        templar: 10,
        artisan: 10
      },
      racialProficiency: {
        fighter: 10,
        scout:   10,
        rogue:   10,
        adept:   10,
        scholar: 10,
        templar: 10,
        artisan: 10
      },
      racialSlay: {
        fighter: 6,
        scout:   6,
        rogue:   6,
        adept:   6,
        scholar: 6,
        templar: 6,
        artisan: 6
      },
      resistBinding: {
        fighter: 4,
        scout:   4,
        rogue:   4,
        adept:   4,
        scholar: 4,
        templar: 4,
        artisan: 4
      },
      resistCommand: {
        fighter: 4,
        scout:   4,
        rogue:   4,
        adept:   4,
        scholar: 4,
        templar: 4,
        artisan: 4
      },
      resistElement: {
        fighter: 3,
        scout:   3,
        rogue:   3,
        adept:   3,
        scholar: 3,
        templar: 3,
        artisan: 3
      },
      resistFear: {
        fighter: 2,
        scout:   2,
        rogue:   2,
        adept:   2,
        scholar: 2,
        templar: 2,
        artisan: 2
      },
      resistMagic: {
        fighter: 5,
        scout:   5,
        rogue:   5,
        adept:   5,
        scholar: 5,
        templar: 5,
        artisan: 5
      },
      resistNecromancy: {
        fighter: 4,
        scout:   4,
        rogue:   4,
        adept:   4,
        scholar: 4,
        templar: 4,
        artisan: 4
      },
      resistPoison: {
        fighter: 4,
        scout:   4,
        rogue:   4,
        adept:   4,
        scholar: 4,
        templar: 4,
        artisan: 4
      },
      archery: {
        fighter: 6,
        scout:   6,
        rogue:   6,
        adept:   8,
        scholar: 12,
        templar: 8,
        artisan: 8
      },
      oneHandedBlunt: {
        fighter: 3,
        scout:   4,
        rogue:   4,
        adept:   5,
        scholar: 6,
        templar: 5,
        artisan: 5
      },
      oneHandedEdged: {
        fighter: 5,
        scout:   5,
        rogue:   5,
        adept:   7,
        scholar: 12,
        templar: 7,
        artisan: 7
      },
      oneHandedMaster: {
        fighter: 7,
        scout:   8,
        rogue:   8,
        adept:   10,
        scholar: 14,
        templar: 10,
        artisan: 10
      },
      polearm: {
        fighter: 8,
        scout:   12,
        rogue:   12,
        adept:   12,
        scholar: 16,
        templar: 12,
        artisan: 12
      },
      smallWeapon: {
        fighter: 2,
        scout:   2,
        rogue:   2,
        adept:   2,
        scholar: 2,
        templar: 2,
        artisan: 2
      },
      staff: {
        fighter: 4,
        scout:   4,
        rogue:   4,
        adept:   4,
        scholar: 4,
        templar: 4,
        artisan: 4
      },
      thrownWeapon: {
        fighter: 2,
        scout:   4,
        rogue:   4,
        adept:   4,
        scholar: 4,
        templar: 4,
        artisan: 4
      },
      twoHandedBlunt: {
        fighter: 6,
        scout:   8,
        rogue:   8,
        adept:   8,
        scholar: 12,
        templar: 8,
        artisan: 8
      },
      twoHandedSword: {
        fighter: 8,
        scout:   12,
        rogue:   12,
        adept:   12,
        scholar: 16,
        templar: 12,
        artisan: 12
      },
      twoHandedMaster: {
        fighter: 10,
        scout:   16,
        rogue:   16,
        adept:   16,
        scholar: 20,
        templar: 16,
        artisan: 16
      },
      twoWeapons: {
        fighter: 2,
        scout:   4,
        rogue:   4,
        adept:   4,
        scholar: 4,
        templar: 4,
        artisan: 4
      },
      assasinate: {
        fighter: 8,
        scout:   3,
        rogue:   3,
        adept:   4,
        scholar: 8,
        templar: 8,
        artisan: 8
      },
      backattack: {
        fighter: 6,
        scout:   3,
        rogue:   3,
        adept:   3,
        scholar: 8,
        templar: 6,
        artisan: 6
      },
      backstab: {
        fighter: 6,
        scout:   6,
        rogue:   3,
        adept:   6,
        scholar: 8,
        templar: 6,
        artisan: 6
      },
      disarm: {
        fighter: 2,
        scout:   2,
        rogue:   2,
        adept:   3,
        scholar: 8,
        templar: 3,
        artisan: 8
      },
      dodge: {
        fighter: 8,
        scout:   6,
        rogue:   5,
        adept:   6,
        scholar: 8,
        templar: 8,
        artisan: 8
      },
      evade: {
        fighter: 8,
        scout:   3,
        rogue:   5,
        adept:   6,
        scholar: 8,
        templar: 8,
        artisan: 8
      },
      eviscerate: {
        fighter: 5,
        scout:   7,
        rogue:   14,
        adept:   14,
        scholar: 14,
        templar: 7,
        artisan: 14
      },
      florentine: {
        fighter: 4,
        scout:   6,
        rogue:   6,
        adept:   6,
        scholar: 8,
        templar: 6,
        artisan: 8
      },
      parry: {
        fighter: 4,
        scout:   4,
        rogue:   8,
        adept:   8,
        scholar: 8,
        templar: 5,
        artisan: 8
      },
      riposte: {
        fighter: 5,
        scout:   5,
        rogue:   5,
        adept:   6,
        scholar: 8,
        templar: 6,
        artisan: 8
      },
      shatter: {
        fighter: 3,
        scout:   3,
        rogue:   3,
        adept:   4,
        scholar: 8,
        templar: 4,
        artisan: 8
      },
      shield: {
        fighter: 6,
        scout:   10,
        rogue:   10,
        adept:   10,
        scholar: 12,
        templar: 10,
        artisan: 10
      },
      slay: {
        fighter: 4,
        scout:   4,
        rogue:   8,
        adept:   8,
        scholar: 8,
        templar: 5,
        artisan: 8
      },
      stunlimb: {
        fighter: 3,
        scout:   3,
        rogue:   3,
        adept:   4,
        scholar: 8,
        templar: 4,
        artisan: 8
      },
      styleMaster: {
        fighter: 10,
        scout:   15,
        rogue:   15,
        adept:   15,
        scholar: 20,
        templar: 15,
        artisan: 15
      },
      terminate: {
        fighter: 12,
        scout:   6,
        rogue:   4,
        adept:   6,
        scholar: 12,
        templar: 12,
        artisan: 12
      },
      waylay: {
        fighter: 12,
        scout:   8,
        rogue:   6,
        adept:   6,
        scholar: 12,
        templar: 12,
        artisan: 12
      },
      weaponMaster: {
        fighter: 15,
        scout:   20,
        rogue:   20,
        adept:   20,
        scholar: 25,
        templar: 20,
        artisan: 20
      },
      weaponproficiency: {
        fighter: 3,
        scout:   6,
        rogue:   6,
        adept:   6,
        scholar: 8,
        templar: 6,
        artisan: 6
      },
      criticalattack: {
        fighter: 3,
        scout:   3,
        rogue:   5,
        adept:   6,
        scholar: 8,
        templar: 3,
        artisan: 8
      },
      readWrite: {
        fighter: 6,
        scout:   6,
        rogue:   6,
        adept:   3,
        scholar: 3,
        templar: 3,
        artisan: 3
      },
      readMagic: {
        fighter: 8,
        scout:   8,
        rogue:   6,
        adept:   4,
        scholar: 4,
        templar: 4,
        artisan: 6
      },
      firstAid: {
        fighter: 2,
        scout:   2,
        rogue:   2,
        adept:   2,
        scholar: 2,
        templar: 2,
        artisan: 2
      },
      healingArts: {
        fighter: 6,
        scout:   6,
        rogue:   4,
        adept:   2,
        scholar: 2,
        templar: 2,
        artisan: 4
      },
      spells: {
        1: {
          fighter: 3,
          scout:   3,
          rogue:   2,
          adept:   1,
          scholar: 1,
          templar: 1,
          artisan: 1
        },
        2: {
          fighter: 3,
          scout:   3,
          rogue:   2,
          adept:   1,
          scholar: 1,
          templar: 1,
          artisan: 2
        },
        3: {
          fighter: 6,
          scout:   6,
          rogue:   4,
          adept:   2,
          scholar: 2,
          templar: 2,
          artisan: 2
        },
        4: {
          fighter: 6,
          scout:   6,
          rogue:   4,
          adept:   3,
          scholar: 2,
          templar: 3,
          artisan: 3
        },
        5: {
          fighter: 9,
          scout:   9,
          rogue:   6,
          adept:   3,
          scholar: 3,
          templar: 3,
          artisan: 4
        },
        6: {
          fighter: 9,
          scout:   9,
          rogue:   6,
          adept:   4,
          scholar: 3,
          templar: 4,
          artisan: 4
        },
        7: {
          fighter: 12,
          scout:   12,
          rogue:   8,
          adept:   5,
          scholar: 4,
          templar: 5,
          artisan: 6
        },
        8: {
          fighter: 12,
          scout:   12,
          rogue:   8,
          adept:   5,
          scholar: 4,
          templar: 5,
          artisan: 6
        },
        9: {
          fighter: 15,
          scout:   15,
          rogue:   10,
          adept:   6,
          scholar: 5,
          templar: 6,
          artisan: 6
        },
        10: {
          fighter: 12,
          scout:   12,
          rogue:   8,
          adept:   4,
          scholar: 3,
          templar: 4,
          artisan: 4
        }
      }
    };


})
