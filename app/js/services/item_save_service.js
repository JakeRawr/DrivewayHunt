'use strict';

module.exports = function(app) {
  app.factory('ItemSave', ['$http', '$cookies', function($http, $cookies) {
    var itemSave = {};

    itemSave.save = function(itemObject, existItemFlag) {
      if (!existItemFlag) {
        $http({
          url: '/api/items',
          method: 'POST',
          headers: {jwt: $cookies.jwt},
          data: itemObject
        })
        .success(function(data) {
          console.log(data);
        })
        .error(function(err) {
          console.log(err);
        });
      } else {
        console.log($cookies.jwt);
        $http({
          url: '/api/items/single/' + itemObject._id,
          method: 'PUT',
          headers: {jwt: $cookies.jwt},
          data: itemObject
        })
        .success(function(data) {
          console.log(data);
        })
        .error(function(err) {
          console.log(err);
        });
      }
    };

    return itemSave;
  }]);
};
