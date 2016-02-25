app.controller('ItemController', ['$scope', '$http', '$window', '$routeParams', 'Character', function($scope, $http, $window, $routeParams, Character) {
  $scope.invalid = Character.invalid;
  $scope.invalidMessage = Character.invalidMessage;
  // booleans to show/hide alerts
  $scope.submitted = false;
  $scope.showErrorAlert = false;
  // alert string
  $scope.errorAlert = '';
$scope.user.email = "foo@bar.com";

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
  //setup item object
  $scope.item = {
    user : $scope.user.email,
  };

  $scope.submit = function(item) {
    $scope.submitted = true;

    var post = item;
    console.log("Post: " + JSON.stringify(post));

    $http.post("/api/item", post)
    .success(function (data, status) {
      // if successfull redirect to /
     // $window.location.href = '/profile';
    })
    .error(function (data) {
      console.log('Error: ' + data);
      $scope.showErrorAlert = true;
      $scope.errorAlert = data[0];
    });
  };


  //define get


  $http.get("/api/characters/" + $scope.user.email)
  .success(function (data) {
    $scope.characters = data;
  })
  .error(function (err) {
    console.log('Error: ' + err);
  });

  //if there is an id present, use the get
  if( $routeParams.id ) {
    $http.get('/api/item/' + $routeParams.id)
    .success(function (data) {
      if(data === null) {
        console.log("Data Null: " + data);
        $scope.showErrorAlert = true;
        $scope.errorAlert = "No Item for that ID";

      } else {
        $scope.item = data;
        console.log("item: " + JSON.stringify(data));
      }
    })
    .error(function (err) {
      console.log('Error: ' + err);
    });
  };

  $scope.save = function(item) {
    $scope.saved = true;

    // user obj we are sending to the server
    var post = item;

    $http.post("/api/item/" + $scope.item._id , post)
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
  $scope.delete = function(character) {
    $http.delete("/api/item/" + $scope.item._id);
  };

}]);
