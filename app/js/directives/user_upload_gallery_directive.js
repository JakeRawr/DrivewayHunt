'use strict';

module.exports = function(app) {
  app.directive('userUploadGallery', function() {
    return {
      restrict: 'AEC',
      replace: true,
      templateUrl: 'js/templates/user_upload_gallery.html'
    };
  });
};
