'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('Search Controller', function() {
  var $controllerConstructor;
  var $scope;
  var $httpBackend;

  beforeEach(angular.mock.module('drivewayApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to construct a controller', function() {
    var searchController = $controllerConstructor('SearchController', {$scope: $scope});
    expect(typeof searchController).toBe('object');
  });

  it('should be able to call searchForSales', function() {
    $controllerConstructor('SearchController', {$scope: $scope});
    $httpBackend.expectGET('api/sales/Seattle').respond(200, [{ info: 'test'}]);
    $scope.searchForSales('Seattle');
    $httpBackend.flush();

    expect($scope.sales).not.toBe(null);
    expect($scope.changeState).toBe('home-view');
  });
});
