'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('Profile Controller', function() {
  var $controllerConstructor;
  var $scope;
  var $rootScope;
  var $anchorScroll;
  var $httpBackend;
  var EVENTS;
  var AuthService;
  var $location;
  var $cookies;

  beforeEach(angular.mock.module('drivewayApp'));

  beforeEach(angular.mock.inject(function(_$httpBackend_, _$anchorScroll_, _$rootScope_, $controller, _$location_, _EVENTS_, _AuthService_, _$cookies_) {
    $scope = _$rootScope_.$new();
    $controllerConstructor = $controller;
    $rootScope = _$rootScope_;
    $location = _$location_;
    $httpBackend = _$httpBackend_;
    $anchorScroll = _$anchorScroll_;
    EVENTS = _EVENTS_;
    AuthService = _AuthService_;
    $cookies = _$cookies_;
  }));

  it('should be able to construct a controller', function() {
    var profileController = $controllerConstructor('ProfileController', {$scope: $scope});
    expect(typeof profileController).toBe('object');
  });

  describe('profile controller functionality', function() {
    beforeEach(angular.mock.inject(function() {
      $controllerConstructor('ProfileController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get a users profile', function() {
      var responseObj = {
        sales: {
          title: 'some title'
        },
        user: {
          email: 'test@example.com'
        },
        items: {
          askingPrice: 12
        }
      };

      $httpBackend.expectGET('/api/userInfo').respond(200, responseObj);
      $scope.getProfile();
      $httpBackend.flush();

      expect($scope.sales.title).toBe(responseObj.sales.title);
      expect($scope.user.email).toBe(responseObj.user.email);
      expect($scope.items.askingPrice).toBe(responseObj.items.askingPrice);
      expect($cookies.userDirectives).toBe('landingPage');
    });

    it('should scroll on the page when an event on the nav is clicked', function() {
      spyOn($location, 'hash');
      $anchorScroll();
      expect($location.hash).toHaveBeenCalled();
    });

    it('should swap out directives', function() {
      $scope.changeDirective('landingPage');
      expect($cookies.userDirectives).toBe('landingPage');
    });

    it('should listen for requests to change directives', function() {
      spyOn($scope, 'changeDirective');
      $rootScope.$broadcast(EVENTS.profileClick);

      expect($scope.changeDirective).toHaveBeenCalledWith('landingPage');
    });
  });
});
