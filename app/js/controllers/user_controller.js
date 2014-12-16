'use strict';

module.exports = function(app) {
  app.controller('UserController', ['$scope', 'AuthService', function($scope, AuthService) {
    $scope.signIn = function(credentials) {
      AuthService.signIn(credentials);
    }
  }]);
};