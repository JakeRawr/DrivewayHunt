'use strict';

module.exports = function(app) {
  app.controller('UserController', ['$scope', 'AuthService', 'EVENTS', function($scope, AuthService, EVENTS) {
    $scope.errors = [];

    $scope.$on(EVENTS.loginSuccess, function() {
      $scope.loginModalShown = false;
      $scope.signupModalShown = false;
    });

    $scope.$on(EVENTS.loginAttempt, function() {
      $scope.loginModalShown = true;
      $scope.signupModalShown = false;
    });

    $scope.$on(EVENTS.signupAttempt, function() {
      $scope.loginModalShown = false;
      $scope.signupModalShown = true;
    });

    $scope.signIn = function(credentials) {
      AuthService.signIn(credentials);
    };

    $scope.signUp = function(newUser) {
      if (newUser.password !== newUser.passwordConfirmation) {
        $scope.errors.push('passwords do not match');
        return;
      }
      AuthService.signUp(newUser);
    };

    $scope.closeModal = function() {
      $scope.loginModalShown = false;
      $scope.signupModalShown = false;
    };
  }]);
};
