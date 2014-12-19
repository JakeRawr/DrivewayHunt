/*jscs:disable requireCamelCaseOrUpperCaseIdentifiers*/
'use strict';

module.exports = function(app) {
  app.controller('UploadGallery', ['$rootScope', '$scope', '$upload', 'EVENTS', 'ItemSave', '$http', function($rootScope, $scope, $upload, EVENTS, ItemSave, $http) {
    $scope.items = $scope.$parent.items;

    console.log('in UploadGallery', $scope.items);

    $scope.itemModalShown = false;

    $scope.$on(EVENTS.itemEditAttempt, function() {
      $scope.itemModalShown = true;
    });

    $scope.$on(EVENTS.itemEditFinished, function() {
      $scope.itemModalShown = false;
    });

    $scope.$on(EVENTS.existingEditAttempt, function() {
      $scope.existingItemModalShown = true;
    });

    $scope.$on(EVENTS.existingEditFinished, function() {
      $scope.existingItemModalShown = false;
    });

    $scope.image = {};

    $scope.upload = function(image) {
      delete $http.defaults.headers.common.jwt;
      delete $http.defaults.headers.common.Authorization;
      if (!image) return;
      $upload.upload({
        url: 'https://api.cloudinary.com/v1_1/dqwea7i3j/upload',
        data: {upload_preset: 'osxh5dpi'},
        file: image
      }).progress(function() {

      }).success(function(data) {
        $scope.image.url = data.url;
        var splitUrl = $scope.image.url.split('upload/');
        $scope.image.url = splitUrl[0] + 'upload/w_100,h_100,c_scale/' + splitUrl[1];
        $scope.image.alt = data.public_id;
        $rootScope.$broadcast(EVENTS.itemEditAttempt);
      });
    };

    $scope.close = function() {
      $rootScope.$broadcast(EVENTS.itemEditFinished);
      $rootScope.$broadcast(EVENTS.existingEditFinished);
    };

    $scope.saveItem = function(itemObject, existItemFlag) {
      //call service
      $rootScope.$broadcast(EVENTS.existingEditFinished);
      $rootScope.$broadcast(EVENTS.itemEditFinished);
      ItemSave.save(itemObject, existItemFlag);
    };

    $scope.itemClick = function(oneItem) {
      $scope.oneItem = oneItem;
      $rootScope.$broadcast(EVENTS.existingEditAttempt);
    };
  }]);
};
