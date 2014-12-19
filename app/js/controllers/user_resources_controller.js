'use strict';

module.exports = function(app) {
  app.controller('UserResourcesController', ['$scope', '$cookies', 'ItemSave', 'SaleSave', function($scope, $cookies, ItemSave, SaleSave) {
    $scope.errors = [];

    $scope.editEvent = function(index) {
      $cookies.currentSale = index;
      $scope.$parent.changeDirective('saleInfo');
    };

    $scope.saveNewEvent = function(saleInfo) {
      //TO-DO HANDLE ERRORS
      SaleSave.save(saleInfo);
    };
  }]);
};
