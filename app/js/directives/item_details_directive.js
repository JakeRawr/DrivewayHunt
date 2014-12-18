'use strict';

module.exports = function(app) {
  app.directive('itemDetail', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'js/templates/photo_enlarge.html',
      transclude: true
    };
  });
};
