'use strict';

module.exports = function(app) {
  app.controller('AppController', ['$scope', 'AUTH_EVENTS', 'AuthService', '$cookies', '$location', function($scope, AUTH_EVENTS, AuthService, $cookies, $location) {
    /**
     * Keep track of current user
     * Initialize to null
     */
    $scope.currentUser = null;

    $scope.signIn = function() {
      $scope.$broadcast(AUTH_EVENTS.loginAttempt);
    };

    $scope.signUp = function() {
      $scope.$broadcast(AUTH_EVENTS.signupAttempt);
    };

    $scope.signOut = function() {
      AuthService.signOut();
    };

    $scope.profileRedirect = function() {
      $location.path('/profile');
      console.log('here');
    };

    $scope.$watch(function() { return $cookies.jwt; }, function(validUser) {
      $scope.currentUser = validUser;
    });
  }]);
};
