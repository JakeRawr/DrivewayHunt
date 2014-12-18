'use strict';

module.exports = function(app) {
  app.directive('UserUploadGallery', function() {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'js/templates/user_upload_gallery.html'
    };
  });
};
