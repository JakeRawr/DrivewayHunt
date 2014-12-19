'use strict';
//var swal = require('sweetalert');
module.exports = function(app) {
  app.controller('SearchController', ['$scope', 'SaleSearch', '$location', '$cookies', function($scope, SaleSearch, $location, $cookies) {
    $scope.sales = null;
    $scope.errors = [];

    //search for results
    $scope.searchForSales = function(location) {
      SaleSearch.search(location)
      .success(function(data) {
        $scope.$emit('searchSubmitted');
        $scope.sales = data;
        $scope.changeState = 'home-view';
        $cookies.location = location;
      })
      .error(function(err) {
        alert(err);
        //swal(err);
        $scope.errors.push(err);
      });
    };

    $scope.inItSearch = function() {
      if ($cookies.location) {
        SaleSearch.search($cookies.location)
        .success(function(data) {
          $scope.$emit('searchSubmitted');
          $scope.sales = data;
          $scope.changeState = 'home-view';
        })
        .error(function(err) {
          alert(err);
          $scope.errors.push(err);
        });
      }
    };

    $scope.redirectSale = function(id) {
      $location.path('/sale').search({id: id});
    };
  }]);
};
