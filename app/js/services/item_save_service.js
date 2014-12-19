'use strict';

module.exports = function(app) {
  app.factory('ItemSave', ['$http', '$cookies', function($http, $cookies) {
    var itemSave = {};

    itemSave.saveExistingItem = function(itemObject) {
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
    };

    itemSave.saveItem = function(titleName, description, condition, url) {
      $http({
        url: '/api/items',
        method: 'POST',
        headers: {jwt: $cookies.jwt},
        data: {saleId: $cookies.saleId, title: titleName, description: description, condition: condition, img: url}
      })
      .success(function(data) {
        console.log(data);
      })
      .error(function(err) {
        console.log(err);
      });
    };

    return itemSave;
  }]);
};
