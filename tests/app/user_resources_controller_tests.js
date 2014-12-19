'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('UserResourcesController Controller', function() {
  var $controllerConstructor;
  var $scope;
  var $cookies;
  var SaleSave;
  var ItemSave;

  beforeEach(angular.mock.module('drivewayApp'));

  beforeEach(angular.mock.inject(function(_$rootScope_, $controller, _$cookies_, _SaleSave_, _ItemSave_) {
    $scope = _$rootScope_.$new();
    $controllerConstructor = $controller;
    SaleSave = _SaleSave_;
    ItemSave = _ItemSave_;
    $cookies = _$cookies_;
  }));

  it('should be able to construct a controller', function() {
    var userResourceController = $controllerConstructor('UserResourcesController', {$scope: $scope});
    expect(typeof userResourceController).toBe('object');
  });

  describe('user resource controller functionality', function() {
    beforeEach(angular.mock.inject(function() {
      $controllerConstructor('UserResourcesController', {$scope: $scope});
    }));

    it('should edit an event', function() {
      var spy = jasmine.createSpy('spy');
      $scope.$parent.changeDirective = spy;

      expect($scope.eventExist).toBeFalsy();
      $scope.editEvent([{title: 'ripe, old peach'}], 0);
      expect($scope.eventExist).toBeTruthy();
      expect($cookies.currentSale).toBe(0);
      expect(spy).toHaveBeenCalled();
    });

    it('should save a new event', function() {
      var saleInfo = {userId: 1, dateStart: '12/19/2014'};
      spyOn(SaleSave, 'save');
      $scope.saveNewEvent({userId: 1, dateStart: '12/19/2014'});
      expect(SaleSave.save).toHaveBeenCalledWith(saleInfo, false);
    });
  });
});
