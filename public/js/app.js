// angular routing
var app = angular.module('alliance', ['ngRoute', 'ngResource']);

// User global object to check loggedin status anywhere in the app
app.service('User', function () {
    return {};
})

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
  .when('/thing', {
    controller: 'ThingController',
    templateUrl: 'js/thing/views/thing.html'
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
    templateUrl: 'js/craft/views/craft.html'
  })
  .when('/crafts', {
    controller: 'CraftController',
    templateUrl: 'js/craft/views/crafts.html'
  })
  .otherwise({
    controller: 'HomeController',
    templateUrl: 'js/home/views/home.html'
  });

  // use the HTML5 History API
  // this line is needed because the SPA urls would show # characters otherwise. It also needs line 6 in index.html
  $locationProvider.html5Mode(true);
});

app.run(function ($rootScope, $location, User, $http) {
  $rootScope.$on('$routeChangeStart', function(event, next, current){
    // check if user is loggedin
    $http.get("/loggedin")
    .success(function (data) {
      if (data.isLoggedIn) {
        // if user is logged in update the global obj
        User = data;
        console.log("poop");
      } else {
        $location.path('/login');
      }
    })
    .error(function (err) {
      console.log('Error: ' + err);
    });
  });
});

