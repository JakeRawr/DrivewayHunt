'use strict';

module.exports = function(app) {
  app.controller('Unicorns', ['$rootScope', '$scope', '$upload', 'AUTH_EVENTS', function($rootScope, $scope, $upload, AUTH_EVENTS) {
    
    $scope.itemModalShown = false;
    $scope.$on(AUTH_EVENTS.itemEditAttempt, function() {
      $scope.itemModalShown = true;
    });

     $scope.$on(AUTH_EVENTS.itemEditFinished, function() {
      $scope.itemModalShown = false;
    });

    $scope.$watch('myFiles', function() {
      $scope.upload = $upload.upload({
        url: 'https://api.cloudinary.com/v1_1/' + 'dqwea7i3j' + '/upload',
        data: {uploadPreset: 'osxh5dpi', tags: 'myphotoalbum', context:'photo=' + $scope.title},
        file: $scope.myFiles
      }).progress(function(e) {
        console.log('e' + e);
      }).success(function(data, status, headers, config) {
        console.log('data ', data);
        console.log('status ', status);
        console.log('headers', headers);
        console.log('config', config);
      });
    });
    
    $scope.uploadSuccess = function() {
      $rootScope.$broadcast(AUTH_EVENTS.itemEditAttempt);
    };

    $scope.close = function() {
      $rootScope.$broadcast(AUTH_EVENTS.itemEditFinished);
    };

    $scope.save = function(title, description, condition, url) {
      console.log(title);
      console.log(description);
      console.log(condition);
      console.log(url);
      //call service
      $rootScope.$broadcast(AUTH_EVENTS.itemEditFinished);
    };
    
  }]);
};
