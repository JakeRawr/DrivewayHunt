'use strict';

module.exports = function(app) {

  app.controller('ViewEvent', ['$routeParams', '$http', '$scope', '$location', function($routeParams, $http, $scope, $location) {
    $scope.viewItemModalShown = false;
    var saleId = $routeParams.id;

    $scope.initController = function() {
      $http.get('/api/items/all/' + saleId)
      .success(function(data) {
        $scope.sale = data.sale[0];
        $scope.items = data.items;
      })
      .error(function(err) {
        alert(err);
      });
    };

    $scope.itemDetail = function(oneItem) {
      $scope.oneItem = oneItem;
      $scope.viewItemModalShown = true;
    };

    $scope.close = function() {
      $scope.viewItemModalShown = false;
    };

    $scope.backToSearch = function() {
      $location.path('/').hash({});
    };
  }]);
};
