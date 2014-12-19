'use strict';

module.exports = function(app) {
  app.controller('UserResourcesController', ['$scope', '$cookies', 'ItemSave', 'SaleSave', function($scope, $cookies, ItemSave, SaleSave) {
    $scope.errors = [];
    $scope.eventExist = false;

    $scope.editEvent = function(items, index) {
      $scope.eventExist = true;
      $scope.items = items;
      console.log('in editEvent', $scope.items);
      $cookies.currentSale = index;
      $scope.$parent.changeDirective('saleInfo');
    };

    $scope.saveNewEvent = function(saleInfo) {
      //TO-DO HANDLE ERRORS
      SaleSave.save(saleInfo, $scope.eventExist);
    };
  }]);
};
