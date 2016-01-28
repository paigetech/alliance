app.controller('ThingController', ['$scope', '$http', '$window', 'User', function($scope, $http, $window, User) {

  //pull in the global user object
  $scope.user = User;
  // booleans to show/hide alerts
  $scope.submitted = false;
  $scope.showErrorAlert = false;
  // alert string
  $scope.errorAlert = '';
  // thing model for our view
  $scope.thing = {
    title : '',
    author : '',
    body : '',
    hidden : false,
    user: User.email,
  }
  // at save button click
  $scope.submit = function(thing) {
    $scope.submitted = true;

    // thing obj we are sending to the server
    var post = {
      title : thing.title,
      author : thing.author,
      body : thing.body,
      hidden : thing.hidden,
      user: thing.user
    };

    $http.post("/api/things", post)
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

  $http.get("/api/things")
  .success(function (data) {
    $scope.things = data;
    console.log("Thing: " + data);
  })
  .error(function (err) {
    console.log('Error: ' + err);
  });


}]);
