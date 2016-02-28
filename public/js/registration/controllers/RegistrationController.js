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
    item: {}
  }
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

  $http.get("/api/registrations/" + $scope.user.email)
  .success(function (data) {
    $scope.regs = data;
    console.log("reg: " + data);
  })
  .error(function (err) {
    console.log('Error: ' + err);
  });

  $http.get("/api/characters/" + $scope.user.email)
  .success(function (data) {
    $scope.characters = data;
  })
  .error(function (err) {
    console.log('Error: ' + err);
  });

  $http.get("/api/items/" + $scope.user.email)
  .success(function (data) {
    $scope.items = data;
  })
  .error(function (err) {
    console.log('Error: ' + err);
  });

}]);
