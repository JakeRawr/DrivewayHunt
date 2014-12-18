/*jscs:disable requireCamelCaseOrUpperCaseIdentifiers*/
'use strict';

module.exports = function(app) {
  app.controller('UploadGallery', ['$rootScope', '$scope', '$upload', 'AUTH_EVENTS', function($rootScope, $scope, $upload, AUTH_EVENTS) {
    $scope.itemModalShown = false;

    $scope.$on(AUTH_EVENTS.itemEditAttempt, function() {
      $scope.itemModalShown = true;
    });

    $scope.$on(AUTH_EVENTS.itemEditFinished, function() {
      $scope.itemModalShown = false;
    });

    $scope.image = {};

    $scope.upload = function(image) {
      if (!image) return;
      $upload.upload({
        url: 'https://api.cloudinary.com/v1_1/dqwea7i3j/upload',
        data: {upload_preset: 'osxh5dpi'},
        file: image
      }).progress(function() {

      }).success(function(data) {
        $scope.image.url = data.url;
        var splitUrl = $scope.image.url.split('upload/');
        $scope.image.url = splitUrl[0] + 'upload/w_200,h_200/' + splitUrl[1];
        $scope.image.alt = data.public_id;
        $rootScope.$broadcast(AUTH_EVENTS.itemEditAttempt);
      });
    };

    $scope.close = function() {
      $rootScope.$broadcast(AUTH_EVENTS.itemEditFinished);
    };

    $scope.save = function(title, description, condition, url) {
      //call service
      console.log(title, description, condition, url);
      $rootScope.$broadcast(AUTH_EVENTS.itemEditFinished);
    };

  }]);
};
