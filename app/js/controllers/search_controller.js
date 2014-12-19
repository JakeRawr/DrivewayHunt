'use strict';

module.exports = function(app) {
  app.controller('SearchController', ['$scope', 'SaleSearch', '$location', function($scope, SaleSearch, $location) {
    $scope.sales = null;
    $scope.errors = [];
  
    //search for results
    $scope.searchForSales = function(location) {
      SaleSearch.search(location)
      .success(function(data) {
        $scope.$emit('searchSubmitted');
        $scope.sales = data;
        $scope.changeState = 'home-view';
      })
      .error(function(err) {
        console.log(err);
        $scope.errors.push(err);
      });
    };

    $scope.redirectSale = function(id) {
      $location.path('/sale').search({id: id});
    };
  }]);
};
