app.controller('RegistrationController', ['$scope', '$http', '$window', 'User', function($scope, $http, $window, User) {

  //pull in the global user object
  $scope.user = User;
  // booleans to show/hide alerts
  $scope.submitted = false;
  $scope.showErrorAlert = false;
  // alert string
  $scope.errorAlert = '';
  // reg model for our view
  $scope.reg = {
    title : '',
    author : '',
    body : '',
    hidden : false,
    user: User.email,
  }
  // at save button click
  $scope.submit = function(reg) {
    $scope.submitted = true;

    // reg obj we are sending to the server
    var post = {
      title : reg.title,
      body : reg.body,
      hidden : reg.hidden,
      user: reg.user
    };

    $http.post("/api/registration", post)
    .success(function (data, status) {
      // if successfull redirect to /
      $window.location.href = '/';
    })
    .error(function (data) {
      console.log('Error: ' + data);
      $scope.showErrorAlert = true;
      $scope.errorAlert = data[0];
    });
  };

  $http.get("/api/registrations")
  .success(function (data) {
    $scope.regs = data;
    console.log("reg: " + data);
  })
  .error(function (err) {
    console.log('Error: ' + err);
  });


}]);
