app.controller('ProfileController', ['$scope', '$http', '$window', 'User', function($scope, $http, $window, User) {

  //pull in the global user object
  $scope.user = User;


}]);
