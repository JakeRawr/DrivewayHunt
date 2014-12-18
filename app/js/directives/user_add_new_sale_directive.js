'use strict';

module.exports = function(app) {
  app.directive('userAddNewSale', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: ''
    };
  });
};
