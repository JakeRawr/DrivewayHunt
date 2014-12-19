'use strict';

module.exports = function(app) {
  app.controller('ProfileController', ['$scope', '$location', '$anchorScroll', '$http', '$cookies', 'EVENTS', function($scope, $location, $anchorScroll, $http, $cookies, EVENTS) {
    //http call to get user data and list of sales
    //$scope.sales => object array
    //$scope.user => object
    $cookies.userDirectives = 'landingPage';
    $scope.activities = [];

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
    };

    $scope.scrollTo = function(id) {
      var old = $location.hash();
      $location.hash(id);
      $anchorScroll();
      $location.hash(old);
    };

    $scope.changeDirective = function(directive, newSale) {
      if (newSale && $cookies.currentSale) delete $cookies.currentSale;
      $cookies.userDirectives = directive;
    };

    $scope.$on(EVENTS.profileClick, function() {
      $scope.changeDirective('landingPage');
    });

    $scope.$watch(function() { return $cookies.userDirectives; }, function(newValue) {
      $scope.userDirectives = newValue;
    });
  }]);
};
