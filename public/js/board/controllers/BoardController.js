app.controller('BoardController', ['$scope', '$http', '$window', '$routeParams', 'Character', function($scope, $http, $window, $routeParams, Character) {

  // booleans to show/hide alerts
  $scope.submitted = false;
  $scope.showErrorAlert = false;
  // alert string
  $scope.errorAlert = '';
  //editor enable
  $scope.editorEnabled = false;

  $scope.editor = function() {
    if ($scope.editorEnabled === true) {
      $scope.editorEnabled = false;
    } else if ($scope.editorEnabled === false) {
      $scope.editorEnabled = true;
    }
  }
  $scope.disableEditor = function() {
    $scope.editorEnabled = false;
  }

  
  $scope.board = {
    character : '',
    name: '',
    celestial : [{name: "1 Disarm", amount: 0}],
    earth : [{name: "1 Cure Disease/Disease", amount: 0}],
    highMagic : [{name: "General: Bane <effect group name>", amount: 0, group: "Gift"}],
    //add groups as selection this should probably be a global
    user: $scope.user.email
  }
  //add spell selection
  $scope.addNewChoice = function(theArray) {
    var newItemNo = theArray.length+1;
    theArray.push({'name':'', 'amount': 0});
  };

  $scope.removeChoice = function(theArray) {
    var lastItem = theArray.length-1;
    theArray.splice(lastItem);
  };

  // at save button click
  $scope.submit = function(board) {
    $scope.submitted = true;

    // thing obj we are sending to the server
    var post = board;
    console.log("the post: " + JSON.stringify(post));

    $http.post("/api/board", post)
   .success(function (data, status) {
      //if successfull redirect to profile
      $window.location.href = '/profile';
    })
    .error(function (data) {
      console.log('Error: ' + data);
      $scope.showErrorAlert = true;
      $scope.errorAlert = data[0];
    });
  };
  //update
  $scope.save = function(board) {
    $scope.submitted = true;

    // thing obj we are sending to the server
    var post = board;
    console.log("the post: " + JSON.stringify(post));

    $http.post('/api/board/' + $routeParams.id + post)
    .success(function (data, status) {
      //if succ'/api/board/' + $routeParams.idessfull redirect to profile
      $window.location.href = '/profile';
    })
    .error('/api/board/' + $routeParams, function (data) {
      console.log('Error: ' + data);
      $scope.showErrorAlert = true;
      $scope.errorAlert = data[0];
    });
  };

  $scope.celestial = [
    "1 Disarm",
    "1 Fortress",
    "1 Light",
    "1 Stone Bolt",
    "2 Lightning Bolt",
    "2 Magic Armor",
    "2 Pin",
    "2 Repel",
    "2 Sheild",
    "3 Bind",
    "3 Ice Bolt",
    "4 Lesser Investment",
    "4 Shatter",
    "4 Wall of Force",
    "5 Release",
    "5 Spell Shield",
    "5 Stone Storm",
    "5 Web",
    "6 Elemental Shield",
    "6 Enflame",
    "6 Lightning Storm",
    "6 Magic Blade",
    "6 Sleep",
    "7 Charm",
    "7 Confine",
    "7 Destroy",
    "7 Ice Storm",
    "7 Subjegate",
    "8 Dispel",
    "8 Dragon's Breath",
    "8 Reflect Magic",
    "8 Solidify",
    "8 Wizard Lock",
    "9 Circle of Power",
    "9 Elemental Blast",
    "9 Magic Storm",
    "9 Prison",
    "9 Ward"
  ];

  $scope.earth = [
    "1 Cure Disease/Disease",
    "1 Cure/Cause Light Wounds",
    "1 Disarm",
    "1 Endow",
    "2 Bless",
    "2 Cure/Cause Wounds",
    "2 Magic Armor",
    "2 Pin",
    "2 Repel",
    "3 Bind",
    "3 Harm/Help Undead",
    "3 Sanctuary/Desecrate",
    "3 Shatter",
    "3 Remove Weakness/Weakness",
    "4 Awaken",
    "4 Cure/Cause Serious Wounds",
    "4 Poison Shield",
    "4 Shun",
    "4 Turn/Control Undead",
    "5 Release",
    "5 Silence/Remove Silence",
    "5 Spell Shield",
    "5 Web",
    "6 Cure/Cause Critical Wounds",
    "6 Earth/Chaos Blade",
    "6 Elemental Shield",
    "6 Restore/Wither",
    "6 Sleep",
    "7 Charm",
    "7 Confine",
    "7 Destroy",
    "7 Destroy/Create Undead",
    "7 Remove Destruction/Destructions",
    "8 Cure/Cause Mortal Wounds",
    "8 Paralysis/Remove Paralysis",
    "8 Purify/Drain",
    "8 Reflect Magic",
    "9 Circle of Power",
    "9 Earth/Chaos Storm",
    "9 Life/Death"
  ];

  $scope.highMagic = [
    "General: Bane <effect group name>",
    "General: Cloak <effect group name>",
    "General: Foresight",
    "General: Flormal Link",
    "General: Magic Augmentation",
    "General: Ritual Manipulation",
    "General: Spellcraft",
    "Celestial: Celesital Armor",
    "Celestial: Channel Foundation Element",
    "Celestial: Elemental Augmentation",
    "Celestial: Elemental Burst",
    "Celestial: Oak of the Arcane",
    "Celestial: Spirit Store",
    "Earth: Channel Earth/Chaos",
    "Earth: Earth's Bounty",
    "Earth: Healers Resolve",
    "Earth: Rebirth"
  ];

  console.log("Board: " + JSON.stringify($scope.board));

  $http.get("/api/characters/" + $scope.user.email)
  .success(function (data) {
    $scope.characters = data;
  })
  .error(function (err) {
    console.log('Error: ' + err);
  });

  //if there is an id present, get the single board
  if( $routeParams.id ) {
    $http.get('/api/board/' + $routeParams.id)
    .success(function (data) {
      if(data === null) {
        console.log("Data Null: " + data);
        $scope.showErrorAlert = true;
        $scope.errorAlert = "No Battle board for that ID";

      } else {
        $scope.board = data;
      }
    })
    .error(function (err) {
      console.log('Error: ' + err);
    });
  };

}]);

app.directive('preventDefault', function() {
  return function(scope, element, attrs) {
    angular.element(element).bing('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
    });
  }
});
