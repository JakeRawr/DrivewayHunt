'use strict';

module.exports = function(app) {
  app.controller('AppController', ['$scope', 'AUTH_EVENTS', 'AuthService', '$cookies', function($scope, AUTH_EVENTS, AuthService, $cookies) {
    /**
     * Keep track of current user
     * Initialize to null
     */
    $scope.currentUser = null;
    $scope.appView = 'home-view';

    $scope.signIn = function() {
      $scope.$broadcast(AUTH_EVENTS.loginAttempt);
    };

    $scope.signUp = function() {
      $scope.$broadcast(AUTH_EVENTS.signupAttempt);
    };

    $scope.signOut = function() {
      AuthService.signOut();
    };

    $scope.$watch(function() { return $cookies.jwt; }, function(validUser) {
      $scope.currentUser = validUser;
    });

    $scope.$on('searchSubmitted', function() {
      if ($scope.appView) $scope.appView = null;
    });
  }]);
};
