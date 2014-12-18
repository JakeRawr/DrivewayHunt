'use strict';

module.exports = function(app) {
  app.directive('searchResults', function() {
    return {
      restrict: 'EAC',
      transclude: true,
      templateUrl: 'js/templates/search_results.html',
      link: function($scope) {
        $scope.relocate = function($event, lat, lng) {
          if (angular.element($event.target)[0].id !== 'redirectSale') {
            $scope.mark = {
              loc: {latitude: lat, longitude: lng}
            };
          }
        };
      }
    };
  });
};
