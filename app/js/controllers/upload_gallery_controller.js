/*jscs:disable requireCamelCaseOrUpperCaseIdentifiers*/
'use strict';
var _ = require('underscore');

module.exports = function(app) {
  app.controller('UploadGallery', ['$rootScope', '$scope', '$upload', 'EVENTS', 'ItemSave', '$http', function($rootScope, $scope, $upload, EVENTS, ItemSave, $http) {
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
        $scope.image.url = splitUrl[0] + 'upload/w_500,h_500,c_scale/' + splitUrl[1];
        $scope.image.alt = data.public_id;
        $rootScope.$broadcast(EVENTS.itemEditAttempt);
      });
    };

    $scope.close = function() {
      $rootScope.$broadcast(EVENTS.itemEditFinished);
      $rootScope.$broadcast(EVENTS.existingEditFinished);
    };

    $scope.saveExistingItem = function(itemObject) {
      //call service
      $rootScope.$broadcast(EVENTS.existingEditFinished);
      $rootScope.$broadcast(EVENTS.itemEditFinished);
      ItemSave.saveExistingItem(itemObject)
      .error(function(err) {
        alert(err);
      });
    };

    $scope.delete = function(oneItem) {
      ItemSave.deleteItem(oneItem)
      .success(function() {
        $scope.listItems = _.without($scope.listItems, oneItem);
      })
      .error(function(err) {
        alert(err);
      });
      $rootScope.$broadcast(EVENTS.existingEditFinished);
      $rootScope.$broadcast(EVENTS.itemEditFinished);
    };

    $scope.saveItem = function(titleName, description, condition, url) {
      //call service
      $rootScope.$broadcast(EVENTS.existingEditFinished);
      $rootScope.$broadcast(EVENTS.itemEditFinished);
      ItemSave.saveItem(titleName, description, condition, url)
      .success(function(data) {
        $scope.listItems.push(data);
      })
      .error(function(err) {
        alert(err);
      });
    };

    $scope.itemClick = function(oneItem) {
      $scope.oneItem = oneItem;
      $rootScope.$broadcast(EVENTS.existingEditAttempt);
    };
  }]);
};
