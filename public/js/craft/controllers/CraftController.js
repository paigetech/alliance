app.controller('CraftController', ['$scope', '$http', '$window', function($scope, $http, $window) {
  // booleans to show/hide alerts
  $scope.submitted = false;
  $scope.showErrorAlert = false;
  // alert string
  $scope.errorAlert = '';

  $scope.craft = {
    user: $scope.user.email,
    totalCost: 0,
    name:  ""
  };

  $scope.craft.scrolls = [
    {name: "Disarm", amount: 0, cost: 5},
    {name: "Light", amount: 0, cost: 5},
    {name: "Stone Bolt", amount: 0, cost:5},
    {name: "Lightning Bolt", amount: 0,cost:10},
    {name: "Magic Armor", amount: 0, cost: 10},
    {name: "Pin", amount: 0, cost: 10},
    {name: "Repel" , amount: 0, cost: 10},
    {name: "Shield", amount: 0, cost: 15},
    {name: "Bind", amount: 0, cost: 15},
    {name: "Ice Bolt", amount: 0, cost: 15},
    {name: "Lesser Investment", amount: 0, cost: 15},
    {name: "Shatter", amount: 0, cost: 15},
    {name: "Wall of Force", amount: 0, cost: 15},
    {name: "Awaken", amount: 0, cost: 20},
    {name: "Flame Bolt", amount: 0, cost: 20},
    {name: "Shun", amount: 0, cost: 20},
    {name: "Release", amount: 0, cost: 25},
    {name: "Spell Shield", amount: 0, cost: 25},
    {name: "Stone Storm", amount: 0, cost: 25},
    {name: "Web", amount: 0, cost: 25},
    {name: "Elemental Shield", amount: 0, cost: 30},
    {name: "Lightning Storm", amount: 0, cost: 30},
    {name: "Sleep", amount: 0, cost: 30},
    {name: "Destroy", amount: 0, cost: 35},
    {name: "Ice Storm", amount: 0, cost: 35},
    {name: "Dispel", amount: 0, cost: 40},
    {name: "Dragon's Breath", amount: 0, cost: 40},
    {name: "Reflect Magic", amount: 0, cost: 40},
    {name: "Wizard Lock", amount: 0, cost: 40}
  ];

  $scope.craft.potions = [
    {name: "Cause Light Wounds", amount: 0, cost: 5},
    {name: "Cure Disease", amount: 0, cost: 5},
    {name: "Cure Light Wounds", amount: 0, cost: 5},
    {name: "Disease", amount: 0, cost: 5},
    {name: "Endow", amount: 0, cost: 5},
    {name: "Bless", amount: 0, cost: 10},
    {name: "Cause Wounds", amount: 0, cost: 10},
    {name: "Cure Wounds", amount: 0, cost: 10},
    {name: "Magic Armor", amount: 0, cost: 10},
    {name: "Remove Weakness", amount: 0, cost: 15},
    {name: "Weakness", amount: 0, cost: 15},
    {name: "Awaken", amount: 0, cost: 20},
    {name: "Cause Serious Wounds", amount: 0, cost: 20},
    {name: "Cure Serious Wounds", amount: 0, cost: 20},
    {name: "Release", amount: 0, cost: 25},
    {name: "Remove Silence", amount: 0, cost: 25},
    {name: "Silence", amount: 0, cost: 25},
    {name: "Spell Shield", amount: 0, cost: 25},
    {name: "Cause Critical Wounds", amount: 0, cost: 30},
    {name: "Cure Critical Wounds", amount: 0, cost: 30},
    {name: "Elemental Shield", amount: 0, cost: 30},
    {name: "Restore", amount: 0, cost: 30},
    {name: "Sleep", amount: 0, cost: 30},
    {name: "Wither", amount: 0, cost: 30},
    {name: "Destruction", amount: 0, cost: 35},
    {name: "Remove Destruction", amount: 0, cost: 35},
    {name: "Cause Mortal Wounds", amount: 0, cost: 40},
    {name: "Cure Mortal Wounds", amount: 0, cost: 40},
    {name: "Drain", amount: 0, cost: 40},
    {name: "Purify", amount: 0, cost: 40},
    {name: "Remove Paralysis", amount: 0, cost: 40},
    {name: "Reflect Magic", amount: 0, cost: 40}
  ];

  $scope.craft.weapons = [
    {name: "Arrow", amount: 0, cost: 0.5},
    {name: "Bolt", amount: 0, cost: 0.5},
    {name: "Silvering an Arrow", amount: 0, cost: 1},
    {name: "Silvering a Bolt", amount: 0, cost: 1},
    {name: "Bludgeon", amount: 0, cost: 5},
    {name: "Dagger", amount: 0, cost: 5},
    {name: "Hatchet", amount: 0, cost: 5},
    {name: "Staff", amount: 0, cost: 5},
    {name: "Throwing Dagger", amount: 0, cost: 5},
    {name: "Javelin", amount: 0, cost: 10},
    {name: "Light Crossbow", amount: 0, cost: 10},
    {name: "Shield", amount: 0, cost: 10},
    {name: "Short Bow", amount: 0, cost: 10},
    {name: "Heavy Crossbow", amount: 0, cost: 15},
    {name: "Long Bow", amount: 0, cost: 15},
    {name: "Short Hammer", amount: 0, cost: 15},
    {name: "Short Mace", amount: 0, cost: 15},
    {name: "Silvering a Weapon", amount: 0, cost: 15},
    {name: "Spear", amount: 0, cost: 15},
    {name: "Long Hammer", amount: 0, cost: 20},
    {name: "Long Mace", amount: 0, cost: 20},
    {name: "Short Axe", amount: 0, cost: 20},
    {name: "Long Axe", amount: 0, cost: 26},
    {name: "Short Sword", amount: 0, cost: 25},
    {name: "Long Sword", amount: 0, cost: 30},
    {name: "Polearm", amount: 0, cost: 40},
    {name: "Two Handed Blunt", amount: 0, cost: 40},
    {name: "Two Handed Sword", amount: 0, cost: 45},
    {name: "Strengthening", amount: 0, cost: 5}
  ];

  $scope.craft.alchemyContact = [
    {name: "Alchemical Solvent", amount: 0, cost: 5},
    {name: "Liquid Light", amount: 0, cost: 5},
    {name: "Oil of Slipperiness", amount: 0, cost: 15},
    {name: "Paste of Stickiness", amount: 0, cost: 15}
  ];

  $scope.craft.alchemyElixir = [
    {name: "Cause Light Damage", amount: 0, cost: 5},
    {name: "Cure Light Damage", amount: 0, cost: 5},
    {name: "Intoxicate", amount: 0, cost: 5},
    {name: "Paranoia", amount: 0, cost: 5},
    {name: "Cause Damage", amount: 0, cost: 10},
    {name: "Hallucinate", amount: 0, cost: 10},
    {name: "Love", amount: 0, cost: 15},
    {name: "Weakness", amount: 0, cost: 15},
    {name: "Antidote", amount: 0, cost: 20},
    {name: "Cause Serious Damage", amount: 0, cost: 20},
    {name: "Laugh", amount: 0, cost: 20},
    {name: "Poison Shield", amount: 0, cost: 20},
    {name: "Nausea", amount: 0, cost: 25},
    {name: "Feeblemind", amount: 0, cost: 30},
    {name: "Sleep", amount: 0, cost: 30},
    {name: "Vertigo", amount: 0, cost: 30},
    {name: "Dominate", amount: 0, cost: 35},
    {name: "Paralysis", amount: 0, cost: 40},
    {name: "Amnesia", amount: 0, cost: 45},
    {name: "Berserk", amount: 0, cost: 45},
    {name: "Death", amount: 0, cost: 45},
    {name: "Enslavement Antidote", amount: 0, cost: 45},
    {name: "Euphoria Antidote", amount: 0, cost: 45},
    {name: "Love Potion #9", amount: 0, cost: 45}
  ];

  $scope.craft.alchemyGas = [
    {name: "Cause Light Damage", amount: 0, cost: 10},
    {name: "Paranoia", amount: 0, cost: 10},
    {name: "Cause Damage", amount: 0, cost: 15},
    {name: "Weakness", amount: 0, cost: 20},
    {name: "Cause Serious Damage", amount: 0, cost: 25},
    {name: "Laugh", amount: 0, cost: 25},
    {name: "Nausea", amount: 0, cost: 30},
    {name: "Feeblemind", amount: 0, cost: 35},
    {name: "Sleep", amount: 0, cost: 35},
    {name: "Vertigo", amount: 0, cost: 35},
    {name: "Dominate", amount: 0, cost: 40},
    {name: "Paralysis", amount: 0, cost: 45}
  ];

  $scope.craft.alchemyWeapon = [
    {name: "Paranoia", amount: 0, cost: 15},
    {name: "Vorpal Coating (Light)", amount: 0, cost: 5},
    {name: "Quicksilver", amount: 0, cost: 10},
    {name: "Vorpal Coating", amount: 0, cost: 15},
    {name: "Weakness", amount: 0, cost: 10},
    {name: "Laugh", amount: 0, cost: 30},
    {name: "Vorpal Coating (Serious)", amount: 0, cost: 20},
    {name: "Nausea", amount: 0, cost: 35},
    {name: "Feeblemind", amount: 0, cost: 40},
    {name: "Sleep", amount: 0, cost: 40},
    {name: "Vertigo", amount: 0, cost: 40},
    {name: "Dominate", amount: 0, cost: 40}
  ];

  $scope.craft.trapsGas = [
    {name: "Gas Trap", amount: 0, cost: 25}
  ];

  $scope.craft.trapsNoisemaker = [
      {name: "Noisemaker Trap", amount: 0, cost: 2}
  ];

  $scope.craft.trapsWeapon = [
    {name: "Weapon Trap: damage 2", amount: 0, cost: 2},
    {name: "Weapon Trap: damage 5", amount: 0, cost: 5},
    {name: "Weapon Trap: damage 10", amount: 0, cost: 10},
    {name: "Weapon Trap: damage 15", amount: 0, cost: 20},
    {name: "Weapon Trap: damage 20", amount: 0, cost: 30},
    {name: "Weapon Trap: damage 30", amount: 0, cost: 50}
  ];

  $scope.craft.trapsFlameAcid = [
    {name: "Flame/Acid Trap: damage 15", amount: 0, cost: 20},
    {name: "Flame/Acid Trap: damage 20", amount: 0, cost: 30},
    {name: "Flame/Acid Trap: damage 30", amount: 0, cost: 40},
    {name: "Flame/Acid Trap: damage 50", amount: 0, cost: 50}
  ];

  $scope.craft.trapsExplosive = [
    {name: "Explosive Trap: damage 20", amount: 0, cost: 40},
    {name: "Explosive Trap: damage 30", amount: 0, cost: 60},
    {name: "Explosive Trap: damage 50", amount: 0, cost: 100}
  ];

  $scope.craft.trapsMechanical = [
    {name: "Mechanical Trap: damage 20", amount: 0, cost: 20},
    {name: "Mechanical Trap: damage 30", amount: 0, cost: 30},
    {name: "Mechanical Trap: damage 50", amount: 0, cost: 50},
    {name: "Mechanical Trap: damage 100", amount: 0, cost: 80}
  ];

  $scope.craft.armor = [
  {name: "1 - 5 Armor Points", amount: 0, cost: 10},
  {name: "6 - 10 Armor Points", amount: 0, cost: 20},
  {name: "11 - 15 Armor Points", amount: 0, cost: 40},
  {name: "16 - 20 Armor Points", amount: 0, cost: 60},
  {name: "21 - 25 Armor Points", amount: 0, cost: 80},
  {name: "26 - 30 Armor Points", amount: 0, cost: 100},
  {name: "31 - 35 Armor Points", amount: 0, cost: 120},
  {name: "36 - 40 Armor Points", amount: 0, cost: 140}
];

  $scope.changeCount = 0;

  $scope.$watch('craft', function(newVal, oldVal){
      $scope.changeCount++;
      $scope.craft.totalCost = calculateCost(newVal);
  }, true);

  // at save button click
  $scope.submit = function(craft) {
    $scope.submitted = true;

    // craft obj we are sending to the server
    var post = {
      user: craft.user,
      name: craft.name,
      totalCost: craft.totalCost,
      scrolls: craft.scrolls,
      potions: craft.potions,
      weapons: craft.weapons,
      alchemyContact: craft.alchemyContact,
      alchemyElixir: craft.alchemyElixir,
      alchemyGas: craft.alchemyGas,
      alchemyWeapon: craft.alchemyWeapon,
      trapsGas: craft.trapsGas,
      trapsNoisemaker: craft.trapsNoisemaker,
      trapsWeapon: craft.trapsWeapon,
      trapsFlameAcid: craft.trapsFlameAcid,
      trapsExplosive: craft.trapsExplosive,
      trapsMechanical: craft.trapsMechanical,
      armor: craft.armor
    };

    $http.post("/api/craft", post)
    .success(function (data, status) {
      // if successful redirect to /
      //$window.location.href = '/';
    })
    .error(function (data) {
      console.log('Error: ' + data);
      $scope.showErrorAlert = true;
      $scope.errorAlert = data[0];
    });
  };


  $http.get("/api/crafts")
  .success(function (data) {
    $scope.crafts = data;
    console.log("Craft: " + data);
  })
  .error(function (err) {
    console.log('Error: ' + err);
  });
}]);

function calculateCost(objectWatched) {
  var total = 0;
  for (var item in objectWatched) {
    for (var subItem in objectWatched[item]) {
      if (objectWatched[item][subItem].amount) {
        var kraft = objectWatched[item][subItem];
        total += parseInt(kraft.amount * kraft.cost);
      }
    }
  }
  return total;
}
