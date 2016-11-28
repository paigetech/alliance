angular.module('alliance')
.factory('Auth', ['$resource', '$rootScope', '$sessionStorage', '$q',
  function($resource, $rootScope, $sessionStorage, $q){

    var Profile = $resource('/api/profile', {}, {
      getUser: {
        method: "GET"
      }
    });

    var auth = {};

    auth.init = function(){
      if(auth.isLoggedIn()){
        $rootScope.user = currentUser();
      } else {
        auth.getUser();
      }
      //setup the user here?
    };

    auth.getUser = function(username, password){
      return $q(function(resolve, reject){
          Profile.getUser().$promise
          .then(function(data) {
              $sessionStorage.user = data;
              $rootScope.user = $sessionStorage.user;
              resolve();
          }, function() {
              reject();
          });
      });
    };

    auth.checkPermissionForView = function(view) {
       if (!view.requiresAuthentication) {
           return true;
       }

       return userHasPermissionForView(view);
    };


    var userHasPermissionForView = function(view){
       if(!auth.isLoggedIn()){
           return false;
       }

       if(!view.permissions || !view.permissions.length){
           return true;
       }

       return auth.userHasPermission(view.permissions);
    };


    auth.userHasPermission = function(permissions){
       if(!auth.isLoggedIn()){
           return false;
       }

       var found = false;
       angular.forEach(permissions, function(permission, index){
           if ($sessionStorage.user.user_permissions.indexOf(permission) >= 0){
               found = true;
               return;
           }
       });

       return found;
    };

    auth.currentUser = function(){
      return $sessionStorage.user;
    };

    auth.isLoggedIn = function(){
      return $sessionStorage.user !== null;
    };

    return auth;

}]);
