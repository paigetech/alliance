app.factory('AuthService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {
  var user = null;

  return ({
    isLoggedIn: isLoggedIn,
    getUserStatus: getUserStatus
  });

  function isLoggedIn() {
    if(user) {
      return true;
    } else {
      return false;
    }
  }

  function getUserStatus() {
    // check if user is loggedin
    $http.get("/loggedin")
    .success(function (data) {
      if (data.isLoggedIn) {
        // if user is logged in update the global obj
        User.isLoggedIn = data.isLoggedIn;
        User.email = data.email;
        User = data;
        // create a local copy of the global obj for local access
        console.log("user: " + JSON.stringify($scope.user));
      }
    })
    .error(function (err) {
      console.log('Error: ' + err);
    });
    return User;
  }

});

