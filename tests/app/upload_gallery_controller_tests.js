/*jscs:disable requireCamelCaseOrUpperCaseIdentifiers*/
'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('UploadGallery Controller', function() {
  var $controllerConstructor;
  var $scope;
  var $rootScope;
  var $upload;
  var $httpBackend;
  var EVENTS;
  var ItemSave;

  beforeEach(angular.mock.module('drivewayApp'));

  beforeEach(angular.mock.inject(function(_$httpBackend_, _$rootScope_, $controller, _EVENTS_, _ItemSave_, _$upload_) {
    $scope = _$rootScope_.$new();
    $controllerConstructor = $controller;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    EVENTS = _EVENTS_;
    ItemSave = _ItemSave_;
    $upload = _$upload_;
  }));

  it('should be able to construct a controller', function() {
    var uploadGallery = $controllerConstructor('UploadGallery', {$scope: $scope});
    expect(typeof uploadGallery).toBe('object');
  });

  describe('gallery uploader functionality', function() {
    beforeEach(angular.mock.inject(function() {
      $controllerConstructor('UploadGallery', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should upload an image', function() {
      spyOn($rootScope, '$broadcast');
      var responseObj = {
        url: 'http://www.example.com/upload/something/',
        public_id: '892398389'
      };

      $httpBackend.expectPOST('https://api.cloudinary.com/v1_1/dqwea7i3j/upload').respond(200, responseObj);
      $scope.upload('animage');
      $httpBackend.flush();

      expect($scope.image.url).toBe('http://www.example.com/upload/w_500,h_500,c_scale/something/');
      expect($scope.image.alt).toBe('892398389');
      expect($rootScope.$broadcast).toHaveBeenCalledWith(EVENTS.itemEditAttempt);
    });

    it('should broadcast an event to close itself', function() {
      spyOn($rootScope, '$broadcast');
      $scope.close();
      expect($rootScope.$broadcast).toHaveBeenCalledWith(EVENTS.itemEditFinished);
    });

    it('should call the ItemSave service', function() {
      var item = {
        titleName: 'lk',
        description: 'asd',
        condition: 'like new',
        url: 'http://.com'
      };
      $httpBackend.expectPOST('/api/items').respond(200, item);
      spyOn($rootScope, '$broadcast');
      $scope.listItems = [];
      $scope.saveItem(item.titleName, item.description, item.condition, item.url);
      $httpBackend.flush();
      expect($rootScope.$broadcast).toHaveBeenCalledWith(EVENTS.itemEditFinished);
      expect($scope.listItems.length).toBeTruthy();
    });
  });
});
