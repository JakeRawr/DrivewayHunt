'use strict';

module.exports = function(app) {
  app.controller('UploadGallery', ['$scope', '$upload', function($scope, $upload) {
      $scope.upload = function(image) {
        if (!image) return;
        $upload.upload({
          url: 'https://api.cloudinary.com/v1_1/dqwea7i3j/upload',
          data: {upload_preset: 'osxh5dpi'},
          file: image
        }).progress(function(e) {
          console.log('e' + e);
        }).success(function(data, status, headers, config) {
          console.log('data ', data);
          console.log('status ', status);
          console.log('headers', headers);
          console.log('config', config);
        });
      };
  }]);
};
