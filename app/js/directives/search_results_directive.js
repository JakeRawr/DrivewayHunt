'use strict';

module.exports = function(app) {
  app.directive('searchResults', function() {
    return {
      restrict: 'EAC',
      transclude: true,
      templateUrl: 'js/templates/search_results.html',
      link: function($scope) {
        $scope.relocate = function(lat, lng) {
          $scope.mark = {
            loc: {latitude: lat, longitude: lng}
          };
        };
        //$scope.mark = $scope.sales[0].loc;
      }
    };
  });
};
