'use strict';

require('../../app/js/client');
require('angular-mocks');


describe('Sales Search Service', function() {
  var SearchService;
  var $httpBackend;

  beforeEach(angular.mock.module('drivewayApp'));

  beforeEach(angular.mock.inject(function(SaleSearch, _$httpBackend_){
    $httpBackend = _$httpBackend_;
    SearchService = SaleSearch;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make a request to sales', function() {
    $httpBackend.expectGET('api/sales/Seattle').respond(200,[]);
    SearchService.search('Seattle');
    $httpBackend.flush();
  })
});