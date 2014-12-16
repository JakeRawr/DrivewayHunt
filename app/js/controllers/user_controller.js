'use strict';

module.exports = function(app) {
  app.controller('UserController', ['$scope', 'AuthService', function($scope, AuthService) {
    $scope.errors = [];

    $scope.signIn = function(credentials) {
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

  }]);
};
