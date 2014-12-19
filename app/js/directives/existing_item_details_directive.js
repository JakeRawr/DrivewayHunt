'use strict';

module.exports = function(app) {
  app.directive('existingItemDetail', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'js/templates/existing_item_details.html',
      transclude: true
    };
  });
};
