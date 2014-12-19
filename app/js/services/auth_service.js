'use strict';

module.exports = function(app) {
  app.factory('AuthService', ['$rootScope', '$http', '$cookies', '$base64', '$location', 'EVENTS', function($rootScope, $http, $cookies, $base64, $location, EVENTS) {
    var authService = {};

    authService.signIn = function(credentials) {
      $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(credentials.email + ':' + credentials.password);
      $http.get('/api/users')
      .success(function(data) {
        //set cookies
        $cookies.jwt = data.jwt;

        //change route
        //broadcast authevent
        $rootScope.$broadcast(EVENTS.loginSuccess);
      })
      .error(function(err) {
        alert(err);
      });
    };

    authService.signUp = function(newUser) {
      $http.post('/api/users', newUser)
      .success(function(data) {
        //set cookies
        $cookies.jwt = data.jwt;

        //change route
        //broadcast authevent
        $rootScope.$broadcast(EVENTS.loginSuccess);
      })
      .error(function(err) {
        alert(err);
      });
    };

    authService.signOut = function() {
      //delete jwt from cookie
      delete $cookies.jwt;
      delete $cookies.profileClick;

      //broadcast signout signal
      $rootScope.$broadcast(EVENTS.logoutSuccess);
    };
    return authService;
  }]);
};
