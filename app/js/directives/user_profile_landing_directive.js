'use strict';

module.exports = function(app) {
  app.directive('userLandingPage', function() {
    return {
      restrict: 'AEC',
      replace: true,
      templateUrl: 'js/templates/user_profile_landing_page.html'
    };
  });
};
