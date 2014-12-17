'use strict';

module.exports = function(app) {
  app.controller('UserController', ['$scope', 'AuthService', 'AUTH_EVENTS', function($scope, AuthService, AUTH_EVENTS) {
    $scope.errors = [];

    $scope.$on(AUTH_EVENTS.loginSuccess, function(event, data){
      $scope.loginModalShown = false;
      $scope.signupModalShown = false;
    });

    $scope.$on(AUTH_EVENTS.loginAttempt, function(event, data){
      $scope.loginModalShown = true;
      $scope.signupModalShown = false;
    });

    $scope.$on(AUTH_EVENTS.signupAttempt, function(event, data){
      $scope.loginModalShown = false;
      $scope.signupModalShown = true;
    });

    $scope.signIn = function(credentials) {
      console.log($scope.loginModalShown);
      AuthService.signIn(credentials);
    };

    $scope.signUp = function(newUser) {
      console.log(newUser);
      if (newUser.password !== newUser.passwordConfirmation) {
        $scope.errors.push('passwords do not match');
        return;
      }
      AuthService.signUp(newUser);
    };

    $scope.closeModal = function(){
      $scope.loginModalShown = false;
      $scope.signupModalShown = false;
    }

    /*
    $scope.toggleModal = function() {
      $scope.signupModalShown = false;
      $scope.loginModalShown = false;
    };
    */

  }]);
};
