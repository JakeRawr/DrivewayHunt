'use strict';

module.exports = function(app) {
  app.directive('resultsMap', ['uiGmapGoogleMapApi', function(uiGmapGoogleMapApi) {
    return {
      restrict: 'AEC',
      templateUrl: 'js/templates/results_map.html',
      transclude: true, //inherit scope from whereever this is nested
      link: function() {
        uiGmapGoogleMapApi.then(function(maps) {
          console.log('maps!:', maps);
        });
      }
    };
  }]);
};
