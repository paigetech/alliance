angular.module('alliance').factory('AuthService', ['$http', function($http){
  function isLoggedIn() {
    // check if user is loggedin
    $http.get("/loggedin")
    .success(function (data) {
      if (data.isLoggedIn) {
        // if user is logged in update the global obj
        User = data;
        // create a local copy of the global obj for local access
        return true;
      }
    })
    .error(function (err) {
      console.log('Error: ' + err);
      return false;
    });
  };

}]);
