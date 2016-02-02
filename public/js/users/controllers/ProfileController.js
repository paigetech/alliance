app.controller('ProfileController', ['$scope', '$http', '$window', 'User', function($scope, $http, $window, User) {

  //pull in the global user object
  $scope.user = User;

  $http.get("/api/things/" + User.email)
  .success(function (data) {
    $scope.userThings = data;
    console.log("Thing: " + data);
  })
  .error(function (err) {
    console.log('Error: ' + err);
  });


}]);
