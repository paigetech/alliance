// angular routing
var app = angular.module('alliance', ['ngRoute', 'ngResource', 'ngStorage']);

// User global object to check loggedin status anywhere in the app
app.service('User', function () {
  return {};
});

// route provider to redirect the user to the requested view, using a single page application setup
app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
  .when('/login', {
    controller: 'LoginController',
    templateUrl: 'js/users/views/login.html'
  })
  .when('/signup', {
    controller: 'SignupController',
    templateUrl: 'js/users/views/signup.html'
  })
  .when('/profile', {
    controller: 'ProfileController',
    templateUrl: 'js/users/views/profile.html'
  })
  .when('/thing', {
    controller: 'ThingController',
    templateUrl: 'js/thing/views/thing.html',
    requiresAuthentication: true
  })
  .when('/things', {
    controller: 'ThingController',
    templateUrl: 'js/thing/views/things.html'
  })
  .when('/thing/:id', {
    controller: 'ThingFindController',
    templateUrl: 'js/thing/views/thing_id.html'
  })
  .when('/craft', {
    controller: 'CraftController',
    templateUrl: 'js/craft/views/craft.html',
    requiresAuthentication: true,
    permissions: ["admin"]
  })
  .when('/crafts', {
    controller: 'CraftController',
    templateUrl: 'js/craft/views/crafts.html'
  })
  .when('/character', {
    controller: 'CharacterController',
    templateUrl: 'js/character/views/character.html',
    requiresAuthentication: true,
    permissions: ["administration"]
  })
  .when('/character/:id', {
    controller: 'CharacterController',
    templateUrl: 'js/character/views/character_id.html'
  })
  .when('/registration', {
    controller: 'RegistrationController',
    templateUrl: 'js/registration/views/registration.html'
  })
  .when('/registrations', {
    controller: 'RegistrationController',
    templateUrl: 'js/registration/views/registrations.html'
  })
  .when('/registration/:id', {
    controller: 'RegistrationController',
    templateUrl: 'js/registration/views/registration_id.html'
  })
  .when('/item', {
    controller: 'ItemController',
    templateUrl: 'js/item/views/item.html'
  })
  .when('/item/:id', {
    controller: 'ItemController',
    templateUrl: 'js/item/views/item_id.html'
  })
  .when('/board', {
    controller: 'BoardController',
    templateUrl: 'js/board/views/board.html'
  })
  .when('/board/:id', {
    controller: 'BoardController',
    templateUrl: 'js/board/views/board_id.html'
  })
  .otherwise({
    controller: 'HomeController',
    templateUrl: 'js/home/views/home.html'
  });

  // use the HTML5 History API
  // this line is needed because the SPA urls would show # characters otherwise. It also needs line 6 in index.html
  $locationProvider.html5Mode(true);
});

app.run( function ($rootScope, $location, $route, Auth, $resource) {
  Auth.init();

  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if(!Auth.checkPermissionForView(next)){
      event.preventDefault();
      //should have some sort of flash message 
      //that they need to log in
      $location.path('/login');
    }
  });
});

app.factory('Auth', ['$resource', '$rootScope', '$sessionStorage', '$q',
  function($resource, $rootScope, $sessionStorage, $q){

    var Profile = $resource('/api/profile', {}, {
      getUser: {
        method: "GET"
      }
    });

    var auth = {};

    auth.init = function(){
      if(auth.isLoggedIn()){
        $rootScope.user = auth.currentUser();
        console.log('already logged in', $rootScope.user);
      } else {
        auth.getUser();
      }
    };

    auth.getUser = function(username, password){
      return $q(function(resolve, reject){

          Profile.getUser()
          .$promise.then(function(user) {
              $sessionStorage.user = user;
              $rootScope.user = $sessionStorage.user;
              console.log('loggin in', $rootScope.user);
              resolve();
          }, function() {
              reject();
          });
      });
    };

    auth.logout = function() {
      delete $sessionStorage.user;
      delete $rootScope.user;
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
       maybe(permissions.forEach(function(permission, index){
           if ($sessionStorage.user.user_permissions.indexOf(permission) >= 0){
               found = true;
               return;
           }
       }));

       return found;
    };

    auth.currentUser = function(){
      if(auth.isLoggedIn()) {
        return $sessionStorage.user;
      } else {
        return '';
      }
    };

    auth.isLoggedIn = function(){
      return $sessionStorage.user ? $sessionStorage.user.isLoggedIn : false;
    };

    return auth;

}]);
