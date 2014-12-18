'use strict';

module.exports = function(app) {
  app.controller('ProfileController', ['$scope', function($scope) {
    console.log($scope);
  }]);
};
