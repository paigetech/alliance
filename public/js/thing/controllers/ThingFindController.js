app.controller('ThingFindController', ['$scope', '$http', '$window', 'User', '$routeParams', function($scope, $http, $window, User, $routeParams) {

  //pull in the global user object
  $scope.user = User;

  $http.get('/api/thing/' + $routeParams.id)
  .success(function (data) {
    $scope.thing = data;
    //console.log("Thing: " + data);
  })
  .error(function (err) {
    console.log('Error: ' + err);
  });


}]);
