'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('App Controller', function() {
  var $controllerConstructor;
  var $scope;
  var $rootScope;
  var EVENTS;
  var AuthService;
  var $location;
  var $cookies;

  beforeEach(angular.mock.module('drivewayApp'));

  beforeEach(angular.mock.inject(function(_$rootScope_, $controller, _$location_, _EVENTS_, _AuthService_, _$cookies_) {
    $scope = _$rootScope_.$new();
    $controllerConstructor = $controller;
    $rootScope = _$rootScope_;
    $location = _$location_;
    EVENTS = _EVENTS_;
    AuthService = _AuthService_;
    $cookies = _$cookies_;
  }));

  it('should be able to construct a controller', function() {
    var appController = $controllerConstructor('AppController', {$scope: $scope});
    expect(typeof appController).toBe('object');
  });

  beforeEach(angular.mock.inject(function() {
    $controllerConstructor('AppController', {$scope: $scope});
    spyOn($rootScope, '$broadcast');
    spyOn($location, 'path');
  }));

  it('should broadcast a sign in event', function() {
    $scope.signIn();
    expect($rootScope.$broadcast).toHaveBeenCalledWith(EVENTS.loginAttempt);
  });

  it('should broadcast a sign up event', function() {
    $scope.signUp();
    expect($rootScope.$broadcast).toHaveBeenCalledWith(EVENTS.signupAttempt);
  });

  it('should sign a user out', function() {
    spyOn(AuthService, 'signOut');
    $scope.signOut();
    expect($location.path).toHaveBeenCalledWith('/');
    expect($cookies.profileClick).toBeUndefined();
    expect(AuthService.signOut).toHaveBeenCalled();
  });

  it('should redirect a signed in user to her or his profile', function() {
    $scope.profileRedirect();
    expect($location.path).toHaveBeenCalledWith('/profile');
    expect($rootScope.$broadcast).toHaveBeenCalledWith(EVENTS.profileClick);
  });

  it('should listen to whether a search has been submitted', function() {
    $rootScope.$broadcast('searchSubmitted');
    expect($scope.appview).toBeUndefined();
  });
});
