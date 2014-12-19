'use strict';

module.exports = function(app) {
  app.directive('viewItemDetail', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'js/templates/view_item_details.html',
      transclude: true
    };
  });
};
