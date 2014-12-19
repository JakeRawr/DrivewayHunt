'use strict';

var _ = require('underscore');

module.exports = function(app) {
  app.factory('SaleSave', ['$http', '$cookies', function($http, $cookies) {
    var saleSave = {};
    saleSave.errors = [];

    //helper method
    saleSave.validate = function(saleInfo) {
      if (!_.contains(_.keys(saleInfo), 'title', 'description', 'address', 'city', 'state', 'zip')) {
        return false;
      }
      return true;
    };

    saleSave.save = function(saleInfo, eventExist) {
      //check if there were any errors
      //save to DB
      //return promise
      $http.defaults.headers.common.jwt = $cookies.jwt;
      if (!eventExist) {
        $http.post('/api/sales', saleInfo)
        .success(function(data) {
          $cookies.saleId = data._id;
        })
        .error(function(err) {
          alert(err);
          return saleSave.errors.push(err);
        });
      } else {
        $http.put('/api/sales/' + saleInfo._id, saleInfo)
        .success(function(data) {
          $cookies.saleId = data._id;
        })
        .error(function(err) {
          alert(err);
          return saleSave.errors.push(err);
        });
      }
    };

    return saleSave;

  }]);
};
