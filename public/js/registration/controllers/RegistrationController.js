app.controller('RegistrationController', ['$scope', '$http', '$window', function($scope, $http, $window) {

  // booleans to show/hide alerts
  $scope.submitted = false;
  $scope.showErrorAlert = false;
  // alert string
  $scope.errorAlert = '';
  // reg model for our view
  $scope.reg = {
    character : '',
    body : '',
    hidden : false,
    user: $scope.user.email,
    item: {},
    board:''
  };
  $scope.boards = '';
  $scope.items = '';
  // at save button click
  $scope.submit = function(reg) {
    $scope.submitted = true;

    // reg obj we are sending to the server
    var post = reg;

    $http.post("/api/registration", post)
    .success(function (data, status) {
      console.log("Post " + JSON.stringify(post));
      // if successfull redirect to /
      $window.location.href = '/';
    })
    .error(function (data) {
      console.log('Error: ' + data);
      $scope.showErrorAlert = true;
      $scope.errorAlert = data[0];
    });
  };


  $http.get("/api/characters/" + $scope.user.email)
  .success(function (data) {
    $scope.characters = data;
  })
  .error(function (err) {
    console.log('Error: ' + err);
  });

//fetch after character assigned?
     function getCharacterThings(character){
        $http.get("/api/items/character/" + character)
        .success(function (data) {
            if(data) {
                $scope.items = data;
            } else {
                $scope.items = '';
            }
        })
        .error(function (err) {
            console.log('Error: ' + err);
        });

        $http.get("/api/boards/character/" + character)
        .success(function (data) {
            if(data) {
                $scope.boards = data;
            } else {
                $scope.boards = '';
            }
        })
        .error(function (err) {
            console.log('Error: ' + err);
        });
    }

    $scope.$watch('reg.character', function(newValue, oldValue) {
        getCharacterThings(newValue);
    });


}]);
