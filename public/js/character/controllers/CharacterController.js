app.controller('CharacterController', ['$scope', '$http', '$window', 'User', '$routeParams', 'Character', function($scope, $http, $window, User, $routeParams, Character) {
  $scope.invalid = Character.invalid;
  $scope.invalidMessage = Character.invalidMessage;
  $scope.build = Character.build;
  $scope.cost = Character.cost;
  //pull in the global user object
  $scope.user = User;
  // booleans to show/hide alerts
  $scope.submitted = false;
  $scope.showErrorAlert = false;
  // alert string
  $scope.errorAlert = '';
  // at save button click
  $scope.submit = function(build) {
    $scope.submitted = true;

    // character obj we are sending to the server
    var post = build;
    console.log("Post: " + post);

    $http.post("/api/character", post)
    .success(function (data, status) {
      // if successfull redirect to /
      $window.location.href = '/profile';
    })
    .error(function (data) {
      console.log('Error: ' + data);
      $scope.showErrorAlert = true;
      $scope.errorAlert = data[0];
    });
  };

  //if there is an id present, use the get
  if( $routeParams.id ) {
    $http.get('/api/character/' + $routeParams.id)
    .success(function (data) {
      if(data === null) {
        console.log("Data Null: " + data);
        $scope.showErrorAlert = true;
        $scope.errorAlert = "No Character for that ID";

      } else {
        $scope.character = data;
      }
    })
    .error(function (err) {
      console.log('Error: ' + err);
    });
  };

  $scope.save = function(character) {
    $scope.saved = true;

    // user obj we are sending to the server
    var post = {
      name : character.name,
      pcClass : character.pcClass,
      race : character.race
      //we don't edit the user ever
    };

    $http.post("/api/character/" + $scope.character._id , post)
    .success(function (data, status) {
      console.log('Successful character!' + JSON.stringify(post));
      // if successfull redirect to /
      $window.location.href = '/';
    })
    .error(function (data) {
      console.log('Error: ' + data);
      $scope.showErrorAlert = true;
      $scope.errorAlert = data[0];
    });
  };
  $scope.delete = function(character) {
    $http.delete("/api/character/" + $scope.character._id);
  };

  $scope.$watch('build', function(newVal, oldVal) {
    Character.spellsValid(newVal.earth);
    Character.spellsValid(newVal.celestial);
    Character.craftsValid(newVal.crafts);
    Character.weaponSkillsValid(newVal.weaponSkills);
    Character.weaponsValid(newVal.weapons);
    Character.scholarSkillsValid(newVal.scholarSkills);
    Character.racialsValid(newVal.racials);
    $scope.cost = Character.totalCost(newVal);
    $scope.invalid = Character.invalidCheck();

    if (hasOwnValue($scope.invalid , true)) {
      $scope.formInvalid = true;
    } else {
      $scope.formInvalid = false;
    }

  }, true);

  hasOwnValue = function(obj, val) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop) && obj[prop] === val) {
        return true;
      }
    }
    return false;
  };

}]);
