'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('Sales Search', function() {
  var $controllerConstructor;
  var SaleSearch;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('drivewayApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller, _SaleSearch_) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
    SaleSearch = _SaleSearch_;
  }));

  it('should be able to create the necessary controller', function() {
    var searchController = $controllerConstructor('SearchController', {$scope: $scope});
    expect(typeof searchController).toBe('object');
  });

  it('should be able to mock the search service', function() {
    expect(typeof SaleSearch).toBe('object');
  });

  describe('Sales Search Service', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $controllerConstructor('SearchController', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    xit('should call SaleSearch', function() {
      $httpBackend.expectGET('api/sales/Seattle').respond(200, [{ title: 'my sale' }]);
      spyOn(SaleSearch, 'search');
      $scope.searchForSales('Seattle');
      $httpBackend.flush();

      expect(SaleSearch.search).toHaveBeenCalled();
    });

    it('should make a request to sales', function() {
      $httpBackend.expectGET('api/sales/Seattle').respond(200, [{ title: 'my sale' }]);
      $scope.searchForSales('Seattle');
      $httpBackend.flush();

      expect($scope.sales).toBeDefined();
      expect($scope.sales[0].title).toBe('my sale');
      expect($scope.changeState).toBe('home-view');
    });
  });

});
