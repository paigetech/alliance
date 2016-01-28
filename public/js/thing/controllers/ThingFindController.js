app.controller('ThingFindController', ['$scope', '$http', '$window', 'User', '$routeParams', function($scope, $http, $window, User, $routeParams) {

  //pull in the global user object
  $scope.user = User;
  $scope.editorEnabled = false;

  $scope.editor = function() {
    if ($scope.editorEnabled === true) {
      $scope.editorEnabled = false;
    } else if ($scope.editorEnabled === false) {
      $scope.editorEnabled = true;
    }
  }
  $scope.disableEditor = function() {
    $scope.editorEnabled = false;
  }

  $http.get('/api/thing/' + $routeParams.id)
  .success(function (data) {
    $scope.thing = data;
    //console.log("Thing: " + data);
  })
  .error(function (err) {
    console.log('Error: ' + err);
  });

  $scope.submit = function(thing) {
    $scope.submitted = true;

    // user obj we are sending to the server
    var post = {
      title : thing.title,
      author : thing.author,
      body : thing.body,
      hidden : thing.hidden
      //we don't edit the user ever
    };

    $http.post("/api/thing/" + $scope.thing._id , post)
    .success(function (data, status) {
      console.log('Successful Thing!' + JSON.stringify(post));
      // if successfull redirect to /
      $window.location.href = '/';
    })
    .error(function (data) {
      console.log('Error: ' + data);
      $scope.showErrorAlert = true;
      $scope.errorAlert = data[0];
    });
  };
  $scope.delete = function(thing) {
    $http.delete("/api/thing/" + $scope.thing._id);
  };


}]);
