'use strict';

module.exports = function(app) {
  app.directive('modalLogin', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'js/templates/modal_login.html',
      transclude: true,
    };
  });
};
