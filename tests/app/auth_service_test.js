'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('auth service', function() {
  var AuthServiceTest;
  var $httpBackend;
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
  var $cookies;

  beforeEach(angular.mock.module('drivewayApp'));

  beforeEach(angular.mock.inject(function(AuthService, _$httpBackend_, _$cookies_) {
    AuthServiceTest = AuthService;
    $httpBackend = _$httpBackend_;
    $cookies = _$cookies_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to sign a user up', function() {
    $httpBackend.expectPOST('/api/users').respond(200, {jwt:'1234abcd'});
    AuthServiceTest.signUp(newUser);
    $httpBackend.flush();

    expect($cookies.jwt).toEqual('1234abcd');
  });

  it('should be able to sign a user in', function() {
    $httpBackend.expectGET('/api/users').respond(200, {jwt:'1234abcd'});
    AuthServiceTest.signIn(existingUser);
    $httpBackend.flush();

    expect($cookies.jwt).toEqual('1234abcd');
  });

  it('should be able to sign a user out', function() {
    AuthServiceTest.signOut();
    expect($cookies.jwt).toBe(undefined);
  });

});
