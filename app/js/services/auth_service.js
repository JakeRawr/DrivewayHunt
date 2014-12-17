'use strict';

module.exports = function(app) {
  app.factory('AuthService', ['$rootScope', '$http', '$cookies', '$base64', '$location', 'AUTH_EVENTS', function($rootScope, $http, $cookies, $base64, $location, AUTH_EVENTS) {
    var authService = {};

    authService.signIn = function(credentials) {
      var _this = this;
      $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(credentials.email + ':' + credentials.password);

      $http.get('/api/users')
      .success(function(data) {
        console.log('auth servuce login');
        //set cookies
        $cookies.jwt = data.jwt;
        //change route

        console.log(_this.loginModalShown);
        //broadcast authevent
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {user: credentials.email});
      })
      .error(function(err) {
        console.log(err);
      });
    };

    authService.signUp = function(newUser) {
      var _this = this;
      console.log('here', newUser);
      $http.post('/api/users', newUser)
      .success(function(data) {
        console.log('auth service signup');
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
      console.log('auth service signout')
      //delete jwt from cookie
      delete $cookies.jwt;

      //broadcast signout signal
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    };

    return authService;
  }]);
};
