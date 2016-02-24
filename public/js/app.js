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
  .when('/profile', {
    controller: 'ProfileController',
    templateUrl: 'js/users/views/profile.html'
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
  .when('/character', {
    controller: 'CharacterController',
    templateUrl: 'js/character/views/character.html'
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
  .otherwise({
    controller: 'HomeController',
    templateUrl: 'js/home/views/home.html'
  });

  // use the HTML5 History API
  // this line is needed because the SPA urls would show # characters otherwise. It also needs line 6 in index.html
  $locationProvider.html5Mode(true);
});

app.run( function ($rootScope, $location, $route, User) {

  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    console.log("User loggedin: " + User.isLoggedIn);
    console.log("User status: " + JSON.stringify(User));
  });
});
