app.controller('ProfileController', ['$scope', '$http', '$window', 'User', function($scope, $http, $window, User) {


  $http.get("/api/things/" + User.email)
  .success(function (data) {
    $scope.userThings = data;
  })
  .error(function (err) {
    console.log('Error: ' + err);
  });

  $http.get("/api/characters/" + User.email)
  .success(function (data) {
    $scope.characters = data;
  })
  .error(function (err) {
    console.log('Error: ' + err);
  });


}]);
