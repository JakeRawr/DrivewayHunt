'use strict';

module.exports = function(app) {
  app.directive('searchResults', function() {
    return {
      restrict: 'EAC',
      transclude: true,
      templateUrl: 'js/templates/search_results.html'
    };
  });
};
