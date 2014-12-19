'use strict';

module.exports = function(app) {
  app.directive('userErrorPage', function() {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'js/templates/user_error_page.html'
    };
  });
};
