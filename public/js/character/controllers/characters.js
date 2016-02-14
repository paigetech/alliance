var appname = angular.module('appname', ['ui.router']);

appname.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-basics.html'
        })
        .state('crafts', {
            url: '/crafts',
            templateUrl: 'partial-crafts.html'
        })
        .state('marshal', {
            url: '/marshal',
            templateUrl: 'partial-marshal.html'
        })
        .state('weapons', {
            url: '/weapons',
            templateUrl: 'partial-weapons.html'
        })
        .state('scholar', {
            url: '/scholar',
            templateUrl: 'partial-scholar.html'
        })
       ;
        
});

appname.controller('appCtrl', ['$scope', '$location',
  function($scope, $location) {
  function submit(build) {
    $http.post('/build/', {
      lessee: lessee
    });
  }

  $scope.test = "weeee";
    $scope.build = {};
    $scope.build.characterName = "Panda";
    $scope.build.weaponSkills = {
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
    $scope.build.earth = {
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
    $scope.build.celestial = {
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
    $scope.build.weapons = {
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
    $scope.build.scholarSkills  = {
      healingArts: false,
      firstAid: false,
      readWrite: false,
      readMagic: false,
      earthPrimary: false,
      celestialPrimary: false
    }
    $scope.build.crafts = {
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
    $scope.build.racials = {
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
    $scope.build.races = "human";
    $scope.build.pcClass = "fighter"; 
    $scope.changeCount = 0;
    $scope.invalid = {};
    $scope.formInvalid = false;
    $scope.cost = 0;
    
    $scope.custom = true;
    $scope.toggleHide = function() {
        $scope.hide = $scope.hide === false ? true: false;
    };
  
    $scope.change = 0;

    function totalCost(build, cost){
      //console.log("total cost!");
      cost = 0;
      $scope.change++;
      pcClass = $scope.build.pcClass;
      //take the build object and pull ref out of the cost obj the multiply
      for (var key in build) {
        //check for earth/celestial

        if (build.hasOwnProperty(key)) {
          if (key === "earth" ) {
            //console.log("found the earth");

            //use the spell cost section
            var obj = build[key]
            for (var ref in obj) {

             level = ref;
             amount = obj[ref];
             skillCost = costs["spells"][level][pcClass]
             if ($scope.build.scholarSkills.earthPrimary === true) {
               cost += skillCost * amount;
             } else {
               cost += skillCost * amount * 2;
             }

            }

          } else if ( key === "celestial") {
            //console.log("found the celestial");

            //use the spell cost section
            var obj = build[key]
            for (var ref in obj) {

             level = ref;
             amount = obj[ref];
             skillCost = costs["spells"][level][pcClass]
             if ($scope.build.scholarSkills.celestialPrimary === true) {
               cost += skillCost * amount;
             } else {
               cost += skillCost * amount * 2;
             }
            }

          } else {
            //use the regular cost calc
            var obj = build[key]
            ////console.log("key: " + key + " val: " + build[key]);
            for (var ref in obj) {
              //key is the skill, obj[key] is the amount
              //if skill is in the costs chart
              //console.log(" val: " + obj[ref]);
                //console.log("ref: " + ref);
                amount = obj[ref];
                skill = ref;
              if (costs[skill]) {
                skillCost = costs[skill][pcClass];
                //console.log("skill: " + skill + " Amount: " + amount + " skillCost: " + skillCost + " Class: " + pcClass);
                cost += skillCost * amount;
                //console.log("cost: " + cost);
              } else {
              //  //console.log("NOT in costs: " + skill);
                //earthPrimary and cPrimary causing problems
                //probably need to seperate build costing skills from character "traits" like race/class etc.
              }
            }
          }
        }
      }

      $scope.cost = cost;

    }
    //need to adjust for null
    function spellsValid(spells){
      
      for (var key in spells) {
        if (spells[key] === 0 || spells[key] === null || spells[key] === "") {
          $scope.invalid[key] = false;
        }
        if (spells[key] > 0 && spells[key] < 10) {
          $scope.levelDif = (Number(spells[key-1]) - Number(spells[key]));
          if( $scope.levelDif > 2 ) {
            $scope.invalid[key-1] = true;
          }
          //need a special check to reset level 1 once valid
          if( $scope.levelDif <= 2 ) {
            $scope.invalid[key-1] = false;
          }
          //things are below 4
          if( spells[key - 1] < 4){
            if(spells[key] >= spells[key -1]) {
              $scope.invalid[key] = true;
            } else {
              $scope.invalid[key] = false;
            }
            
          }
          //things are above 4
          if( spells[key - 1] >= 4){
            if(spells[key] > spells[key -1]) {
              $scope.invalid[key] = true;
            } else {
              $scope.invalid[key] = false;
            }
          }
        }
        if (spells[key] === 10) {
        //formal check
          if (spells['9'] < 1 && spells[10] > 0) {
            //console.log('no 9th');
            $scope.invalid[10] = true;
          }
        }
      }
    }
    
    function weaponSkillsValid(skills){
      //fighter skills
      //eviscerate
      if (skills.eviscerate >= 1 && skills.weaponproficiency/skills.eviscerate < 4) {
        $scope.invalid.eviscerate = true;
      } else { $scope.invalid.eviscerate = false; }
      //slay
      if (skills.slay >= 1 && skills.weaponproficiency/skills.slay < 2) {
        $scope.invalid.slay = true;
      } else { $scope.invalid.slay = false; }
      //parry
      if (skills.parry >= 1 && skills.weaponproficiency/skills.parry < 2) {
        $scope.invalid.parry = true;
      } else { $scope.invalid.parry = false; }
      
      //rogue skills
      //assasinate
      if (skills.assasinate >= 1 && skills.backstab/skills.assasinate < 2) {
        $scope.invalid.assasinate = true;
      } else { $scope.invalid.assasinate = false; }
      //dodge
      if (skills.dodge >= 1 && skills.backstab/skills.dodge < 2) {
        $scope.invalid.dodge = true;
      } else { $scope.invalid.dodge = false; }
      //evade
      if (skills.evade >= 1 && skills.backstab/skills.evade < 1) {
        $scope.invalid.evade = true;
      } else { $scope.invalid.evade = false; }
      //terminate
      if (skills.terminate >= 1 && skills.backstab/skills.terminate < 4) {
        $scope.invalid.terminate = true;
      } else { $scope.invalid.terminate = false; }
      
      
      //combine skills
      //disarm
      if (skills.disarm >= 1 && (skills.weaponproficiency + skills.backstab)/skills.disarm < 1) {
        $scope.invalid.disarm = true;
      } else { $scope.invalid.disarm = false; }
      //shatter - does not work with scout loggic ATM
      if (skills.shatter >= 1 && ((skills.weaponproficiency/3)+(skills.backstab/3))/skills.shatter < 1) {
        $scope.invalid.shatter = true;
      } else { $scope.invalid.shatter = false; }
      //stunlimb - does not work with scout loggic ATM
      if (skills.stunlimb >= 1 && ((skills.weaponproficiency/3)+(skills.backstab/3))/skills.stunlimb < 1) {
        $scope.invalid.stunlimb = true;
      } else { $scope.invalid.stunlimb = false; }
      //riposte - does not work with scout loggic ATM
      if (skills.riposte >= 1 && ((skills.weaponproficiency/4)+(skills.backstab/4))/skills.riposte < 1) {
        $scope.invalid.riposte = true;
      } else { $scope.invalid.riposte = false; }
    }
    
    function weaponsValid(skills){
      if (skills.twoWeapons === true && skills.florentine === false){
        $scope.invalid.twoWeapons = true;
      } else {
        $scope.invalid.twoWeapons = false;
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
    
    function scholarSkillsValid(skills){
      if (skills.readMagic === true && skills.readWrite === false){
        $scope.invalid.readMagic = true;
      } else {
        $scope.invalid.readMagic = false;
      }
      if (skills.healingArts === true && skills.readWrite === false){
        $scope.invalid.healingArts = true;
      } else {
        $scope.invalid.healingArts = false;
      }
    }
    
    function craftsValid(skills){
      if(skills.alchemy > 0 && skills.herbalLore === false){
        $scope.invalid.alchemy = true;
        //console.log("invalid");
      } else {
        $scope.invalid.alchemy = false;
      }
      if(skills.createTrap > 0 && skills.legerdermain === false){
        $scope.invalid.createTrap = true;
      } else {
        $scope.invalid.createTrap = false;
      }
      if(skills.herbalLore > 0 && $scope.build.scholarSkills.readWrite === false){
        $scope.invalid.herbalLore = true;
      } else {
        $scope.invalid.herbalLore = false;
      }
      if(skills.createPotion > 0 && $scope.earth[1] < 1){
        $scope.invalid.createPotion = true;
      } else {
        $scope.invalid.createPotion = false;
      }
      if(skills.createScroll > 0 && $scope.celestial[1] < 1){
        $scope.invalid.createScroll = true;
      } else {
        $scope.invalid.createScroll = false;
      }
    }
    
    function racialsValid(skills){
      //console.log("racial valid");
      if(skills.breakCommand > 0){
        if ( $scope.build.races === "biata" || $scope.build.races === "mysticWoodElf" || $scope.build.races === "stoneElf" || $scope.build.races === "wylderkin"){
          $scope.invalid.breakCommand = false;
        } else {
          $scope.invalid.breakCommand = true;
        } 
      } else { $scope.invalid.breakCommand = false; }
      if(skills.claws > 0){
        if ( $scope.build.races === "sarr" || $scope.build.races === "wylderkin"){
          $scope.invalid.claws = false;
        } else {
          $scope.invalid.claws = true;
        } 
      } else { $scope.invalid.claws = false; }
      if(skills.gypsyCurse > 0){
        if ( $scope.build.races === "gypsy" || $scope.build.races === "wylderkin"){
          $scope.invalid.gypsyCurse = false;
        } else {
          $scope.invalid.gypsyCurse = true;
        } 
      } else { $scope.invalid.gypsyCurse = false; }
      if(skills.racialAssasinate > 0){
        if ( $scope.build.races === "sarr" || $scope.build.races === "wylderkin"){
          $scope.invalid.racialAssasinate = false;
        } else {
          $scope.invalid.racialAssasinate = true;
        } 
      } else { $scope.invalid.racialAssasinate = false; }
      if(skills.resistBinding > 0){
        if ( $scope.build.races === "dryad" || $scope.build.races === "wylderkin"){
          $scope.invalid.resistBinding = false;
        } else {
          $scope.invalid.resistBinding = true;
        } 
      } else { $scope.invalid.resistBinding = false; }
      if(skills.resistCommand > 0){
        if ( $scope.build.races === "biata" || $scope.build.races === "darkElf" || $scope.build.races === "elf" || $scope.build.races === "mysticWoodElf" || $scope.build.races === "stoneElf" || $scope.build.races === "wylderkin"){
          $scope.invalid.resistCommand = false;
        } else {
          $scope.invalid.resistCommand = true;
        } 
      } else { $scope.invalid.resistCommand = false; }
      if(skills.resistElement > 0){
        if ( $scope.build.races === "barbarian" || $scope.build.races === "dwarf" || $scope.build.races === "wylderkin"){
          $scope.invalid.resistElement = false;
        } else {
          $scope.invalid.resistElement = true;
        } 
      } else { $scope.invalid.resistElement = false; }
      if(skills.resistFear > 0){
        if ( $scope.build.races === "barbarian" || $scope.build.races === "highOrc" || $scope.build.races === "wylderkin"){
          $scope.invalid.resistFear = false;
        } else {
          $scope.invalid.resistFear = true;
        } 
      } else { $scope.invalid.resistFear = false; }
      if(skills.resistMagic > 0){
        if ( $scope.build.races === "darkElf" || $scope.build.races === "wylderkin"){
          $scope.invalid.resistMagic = false;
        } else {
          $scope.invalid.resistMagic = true;
        } 
      } else { $scope.invalid.resistMagic = false; }
      if(skills.resistNecromancy > 0){
        if ( $scope.build.races === "highOgre" || $scope.build.races === "wylderkin"){
          $scope.invalid.resistNecromancy = false;
        } else {
          $scope.invalid.resistNecromancy = true;
        } 
      } else { $scope.invalid.resistNecromancy = false; }
      if(skills.resistPoison > 0){
        if ( $scope.build.races === "dwarf" || $scope.build.races === "hobbling" || $scope.build.races === "sarr" || $scope.build.races === "wylderkin"){
          $scope.invalid.resistPoison = false;
        } else {
          $scope.invalid.resistPoison = true;
        } 
      } else { $scope.invalid.resistPoison = false; }
      if(skills.racialDodge === true){
        //console.log("dodge");
        if ( $scope.build.races === "hobling" || $scope.build.races === "wylderkin"){
          $scope.invalid.racialDodge = false;
        } else {
          $scope.invalid.racialDodge = true;
        } 
      } else { $scope.invalid.racialDodge = false; }
      if(skills.racialSlay === true){
        if ( $scope.build.races === "highOrc" || $scope.build.races === "wylderkin"){
          $scope.invalid.racialSlay = false;
        } else {
          $scope.invalid.racialSlay = true;
        } 
      } else { $scope.invalid.racialSlay = false; }
      if(skills.racialProfficiency === true){
        if ( $scope.build.races === "highOrc" || $scope.build.races === "highOgre" || $scope.build.races === "wylderkin"){
          $scope.invalid.profficiency = false;
        } else {
          $scope.invalid.racialProfficiency = true;
        } 
      } else { $scope.invalid.racialProfficiency = false; }
    }
    hasOwnValue = function(obj, val) {
      for(var prop in obj) {
        if(obj.hasOwnProperty(prop) && $scope.build[prop] === val) {
          return true;
        }
      }
      return false;
    };
    
    $scope.$watch('build', function(newVal, oldVal) {
      spellsValid(newVal.earth);
      spellsValid(newVal.celestial);
      craftsValid(newVal.crafts);
      weaponSkillsValid(newVal.weaponSkills);
      weaponsValid(newVal.weapons);
      scholarSkillsValid(newVal.scholarSkills);
      racialsValid(newVal.racials);
      totalCost(newVal, $scope.cost);
      if (hasOwnValue($scope.invalid , true)) {
        $scope.formInvalid = true;
      } else {
        $scope.formInvalid = true;
      }

    }, true);
    
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

}]);
