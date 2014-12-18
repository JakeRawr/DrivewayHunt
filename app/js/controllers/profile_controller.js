'use strict';

module.exports = function(app) {
  app.controller('ProfileController', ['$scope', '$location', '$anchorScroll', '$http', '$cookies', function($scope, $location, $anchorScroll, $http, $cookies) {
    //http call to get user data and list of sales
    //$scope.sales => object array
    //$scope.user => object
    $cookies.userDirectives = 'landingPage';

    $scope.getProfile = function() {
      $http.get('/api/userInfo', {
        headers: {jwt: $cookies.jwt}
      })
      .success(function(data) {
        $scope.sales = data.sales;
        $scope.user = data.user;
        $scope.items = data.items;
        $cookies.userDirectives = 'landingPage';
      })
      .error(function(err) {
        console.log(err);
        $cookies.userDirectives = 'userLoadError';
      });

      $scope.activities = [
        'test activity 1',
        'test activity 2',
        'test activity 3',
        'test activity 4',
        'test activity 5',
        'test activity 6',
        'test activity 7',
        'test activity 8',
        'test activity 9',
        'test activity 10',
        'test activity 11',
        'test activity 12',
        'test activity 13',
        'test activity 14'
      ];
    };

    $scope.getItemThumbnail = function(item) {
      console.log(item);
    };

    $scope.scrollTo = function(id) {
      var old = $location.hash();
      $location.hash(id);
      $anchorScroll();
      $location.hash(old);
    };

    $scope.create = function() {
      $cookies.userDirectives = 'newSale';
    };

    $scope.uploadGallery = function() {
      $cookies.userDirectives = 'uploadGallery';
    };

    $scope.changeDirective = function(directive) {
      $cookies.userDirectives = directive;
    };

    $scope.$watch(function() { return $cookies.userDirectives; }, function(newValue) {
      $scope.userDirectives = newValue;
      console.log($scope.userDirectives);
    });
  }]);
};
