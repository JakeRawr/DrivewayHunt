'use strict';

module.exports = function(app) {
  app.factory('ItemSave', ['$http', '$cookies', function($http, $cookies) {
    var itemSave = {};

    itemSave.saveExistingItem = function(itemObject) {
      return $http({
        url: '/api/items/single/' + itemObject._id,
        method: 'PUT',
        headers: {jwt: $cookies.jwt},
        data: itemObject
      });
    };

    itemSave.saveItem = function(titleName, description, condition, url) {
      return $http({
        url: '/api/items',
        method: 'POST',
        headers: {jwt: $cookies.jwt},
        data: {saleId: $cookies.saleId, title: titleName, description: description, condition: condition, img: url}
      });
    };

    itemSave.deleteItem = function(itemObject) {
      console.log(itemObject.userId);
      return $http({
        url: '/api/items/single/' + itemObject._id,
        method: 'DELETE',
        headers: {jwt: $cookies.jwt}
      });
    };

    return itemSave;
  }]);
};
