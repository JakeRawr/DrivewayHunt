'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('ViewEvent Controller', function() {
  var $controllerConstructor;
  var $scope;
  var $httpBackend;
  var $routeParams;

  beforeEach(angular.mock.module('drivewayApp'));

  beforeEach(angular.mock.inject(function(_$rootScope_, $controller, _$httpBackend_, _$routeParams_) {
    $scope = _$rootScope_.$new();
    $controllerConstructor = $controller;
    $httpBackend = _$httpBackend_;
    $routeParams = _$routeParams_;
  }));

  it('should be able to construct a controller', function() {
    var viewEvent = $controllerConstructor('ViewEvent', {$scope: $scope});
    expect(typeof viewEvent).toBe('object');
  });

  describe('event viewer controller functionality', function() {
    beforeEach(angular.mock.inject(function() {
      $controllerConstructor('ViewEvent', {$scope: $scope});
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    xit('should load all items on init', function() {
      $routeParams.id = 1;
      $httpBackend.expectGET('/api/items/all/1').respond(200, {sale: [{ userId: 1, title: 'sale title' }], items: [{ saleId: 2, askingPrice: 1}]});
      $scope.initController();
      $httpBackend.flush();

      expect($scope.sale.userId).toBe(1);
      expect($scope.items.saleId).toBe(2);
    });

    it('should put one item on scope', function() {
      var item = {
        title: 'pencil',
        askingPrice: 4
      };
      $scope.itemDetail(item);
      expect($scope.viewItemModalShown).toBeTruthy();
      expect($scope.oneItem.title).toBe('pencil');
    });

    it('should change $scope state in order to close', function() {
      $scope.close();
      expect($scope.viewItemModalShown).toBeFalsy();
    });

  });
});
