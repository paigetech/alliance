app.controller('ItemController', ['$scope', '$http', '$window', '$routeParams', 'Character', function($scope, $http, $window, $routeParams, Character) {
  $scope.invalid = Character.invalid;
  $scope.invalidMessage = Character.invalidMessage;
  // booleans to show/hide alerts
  $scope.submitted = false;
  $scope.showErrorAlert = false;
  // alert string
  $scope.errorAlert = '';
  //setup item object
  $scope.item = {
    user : $scope.user.email,
    character : "",
    MIID : "",
    repID : "",
    itemType : "",
    physRepDesc : "",
    restriction : "",
    flaw : "",
    notes : "",
    ritualEffect : "",
    uses : "",
    aspect : "",
    type : "",
    expiraction : ""
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

}]);
