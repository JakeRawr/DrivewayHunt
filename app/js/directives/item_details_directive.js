'use strict';

module.exports = function(app) {
  app.directive('itemDetail', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'js/templates/item_details.html',
      transclude: true
    };
  });
};
