app.controller('CharacterController', ['$scope', '$http', '$window', 'User', function($scope, $http, $window, User) {

  //pull in the global user object
  $scope.user = User;
  // booleans to show/hide alerts
  $scope.submitted = false;
  $scope.showErrorAlert = false;
  // alert string
  $scope.errorAlert = '';
  // thing model for our view
  $scope.character = {
    name : '',
    pcClass : '',
    race : '',
    user: $scope.user.email,
  }
  // at save button click
  $scope.submit = function(character) {
    $scope.submitted = true;

    // thing obj we are sending to the server
    var post = {
      name : character.name,
      pcClass : character.pcClass,
      race : character.race,
      user: $scope.user.email,
    };

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



}]);
