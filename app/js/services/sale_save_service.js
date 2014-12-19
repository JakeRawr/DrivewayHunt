'use strict';

var _ = require('underscore');

module.exports = function(app) {
  app.factory('SaleSave', ['$http', '$cookies', function($http, $cookies) {
    var saleSave = {};
    saleSave.errors = [];

    //helper method
    saleSave.validate = function(saleInfo) {
      if (!_.contains(saleInfo, 'title', 'description', 'address', 'city', 'state', 'zip')) {
        this.errors.push('missing required fields');
      }
      return;
    };

    saleSave.save = function(saleInfo) {
      //call helper method that validates input
      this.validate(saleInfo);

      //check if there were any errors
      if (this.errors.length > 0) return this.errors;

      //save to DB
      //return promise
      $http.defaults.headers.common.jwt = $cookies.jwt;
      $http.post('/api/sales', saleInfo)
      .success(function() {
        return;
      })
      .error(function(err) {
        return saleSave.errors.push(err);
      });
    };

    return saleSave;

  }]);
};
