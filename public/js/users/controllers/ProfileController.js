app.controller('ProfileController', ['$scope', '$http', '$window', function($scope, $http, $window) {


  $http.get("/api/things/" + $scope.user.email)
  .success(function (data) {
    $scope.userThings = data;
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


}]);
