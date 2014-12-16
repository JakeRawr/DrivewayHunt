'use strict';

module.exports = function(app) {
  app.factory('AuthService', ['$rootScope', '$http', '$cookies', '$base64', '$location', 'AUTH_EVENTS', function($rootScope, $http, $cookies, $base64, $location, AUTH_EVENTS) {
    var authService = {};

    authService.signIn = function(credentials) {
      $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(credentials.email + ':' + credentials.password);

      $http.get('/api/users')
      .success(function(data) {
        //set cookies
        $cookies.jwt = data.jwt;
        //change route

        //broadcast authevent
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {user: credentials.email});
      })
      .error(function(err) {
        console.log(err);
      });
    };

    authService.signUp = function(newUser) {
      console.log('here', newUser);
      $http.post('/api/users', newUser)
      .success(function(data) {
        //set cookies
        $cookies.jwt = data.jwt;
        //change route

        //broadcast authevent
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {user: newUser.email});
      })
      .error(function(err) {
        console.log(err);
      });
    };

    authService.signOut = function() {
      //delete jwt from cookie
      delete $cookies.jwt;

      //broadcast signout signal
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);

      //reroute somewhere
    };

    return authService;
  }]);
};
