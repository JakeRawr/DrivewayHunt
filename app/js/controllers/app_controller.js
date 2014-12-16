'use strict';

module.exports = function(app) {
  app.controller('AppController', ['$scope', 'AUTH_EVENTS', 'AuthService', '$cookies', function($scope, AUTH_EVENTS, AuthService, $cookies) {
    /**
     * Keep track of current user
     * Initialize to null
     */
    $scope.currentUser = null;

    /**
     * Listen for broadcasted AUTH_EVENTS
     */
    $scope.$on(AUTH_EVENTS.loginSuccess, function(event, data) {

    });

    $scope.$on(AUTH_EVENTS.logoutSuccess, function() {

    });

    $scope.signIn = function() {
      console.log('sign in event');
      //open the view with the sign in stuff
    };

    $scope.signOut = function() {
      console.log('sign out event');
      AuthService.signOut();
    };

    $scope.$watch(function() { return $cookies.user }, function(validUser) {
      $scope.currentUser = validUser;
    });
  }]);
};
