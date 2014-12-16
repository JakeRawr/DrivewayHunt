'use strict';

module.exports = function(app) {
  app.directive('resultsMap', function() {
    return {
      restrict: 'AEC',
      templateUrl: 'js/templates/results_map.html',
      transclude: true //inherit scope from whereever this is nested
    };
  });
};
