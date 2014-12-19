'use strict';

module.exports = function(app) {
  app.controller('UserResourcesController', ['$scope', '$cookies', 'ItemSave', 'SaleSave', 'EVENTS', function($scope, $cookies, ItemSave, SaleSave, EVENTS) {
    $scope.errors = [];
    $scope.eventExist = false;

    $scope.editEvent = function(items, index) {
      $scope.eventExist = true;
      $scope.listItems = items;
      $cookies.currentSale = index;
      $scope.$parent.changeDirective('saleInfo');
    };

    $scope.saveNewEvent = function(saleInfo, justSave) {
      //TO-DO HANDLE ERRORS
      if (SaleSave.validate(saleInfo)) {
        if (!justSave) {
          $scope.changeDirective('uploadGallery');
        }
        SaleSave.save(saleInfo, $scope.eventExist);
      } else {
        alert('missing required fields');
      }
    };

    $scope.back = function() {
      $scope.$parent.changeDirective('landingPage');
      $scope.$broadcast(EVENTS.profileClick);
    };
  }]);
};
