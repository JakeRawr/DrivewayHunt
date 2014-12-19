'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('User Controller', function() {
  var $controllerConstructor;
  var $httpBackend;
  var $scope;
  var $cookies;

  beforeEach(angular.mock.module('drivewayApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  var newUser = {
    firstName: 'serviceTest',
    email: 'serviceTest@example.com',
    password: 'foobar123',
    passwordConfirmation: 'foobar123'
  };

  var existingUser = {
    email: 'serviceTest@example.com',
    password: 'foobar123'
  };

  it('should be able to construct a controller', function() {
    var userController = $controllerConstructor('UserController', {$scope: $scope});
    expect(typeof userController).toBe('object');
  });

  describe('methods', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, _$cookies_) {
      $httpBackend = _$httpBackend_;
      $cookies = _$cookies_;
      $controllerConstructor('UserController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to signup a new user', function() {
      $httpBackend.expectPOST('/api/users').respond(200, {jwt:'1234abcd'});
      $scope.signUp(newUser);
      $httpBackend.flush();
      expect($cookies.jwt).toEqual('1234abcd');
    });

    it('should be able log in an existing user', function() {
      $httpBackend.expectGET('/api/users').respond(200, {jwt:'1234abcd'});
      $scope.signIn(existingUser);
      $httpBackend.flush();
      expect($cookies.jwt).toEqual('1234abcd');
    });
  });
});
