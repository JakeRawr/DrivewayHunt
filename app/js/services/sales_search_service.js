'use strict';

module.exports = function(app) {
  app.factory('SaleSearch', ['$http', function($http) {
    var saleSearch = {};

    saleSearch.search = function(location) {
      return $http.get('api/sales/' + location);
    };

    return saleSearch;
  }]);
};
