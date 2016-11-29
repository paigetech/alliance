app.controller('IndexController', ['$scope', '$http', 'Auth', '$location', function($scope, $http, Auth, $location) {

  Auth.init();
  // check if user is loggedin
  $scope.user = Auth.currentUser();

  $scope.logout = function() {
    console.log('logout');
    // user is logging out
    $http.get("/logout");
    Auth.logout();
    $scope.user = Auth.currentUser();
    $location.path("/");
  }
}]);
