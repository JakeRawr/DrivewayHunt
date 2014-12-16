'use strict';

module.exports = function(app) {
  app.controller('AppController', ['$scope', 'AUTH_EVENTS', 'AuthService', function($scope, AUTH_EVENTS, AuthService) {
    /**
     * Keep track of current user
     */
    $scope.currentUser = null;

    /**
     * Listen for broadcasted AUTH_EVENTS
     */
    $scope.$on(AUTH_EVENTS.loginSuccess, function(event, data) {
      // TO-DO -> remember to fix this
      $scope.currentUser = data.user;
    });

    $scope.$on(AUTH_EVENTS.logoutSuccess, function() {
      $scope.currentUser = null;
    });

    $scope.signIn = function() {
      console.log('sign in event');
      //open the view with the sign in stuff
    };

    $scope.signOut = function() {
      console.log('sign out event');
      AuthService.signOut();
    };

  }]);
};
