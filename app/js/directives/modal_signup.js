'use strict';

module.exports = function(app) {
  app.directive('modalSignup', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'js/templates/modal_signup.html',
      transclude: true
    };
  }); 
};
