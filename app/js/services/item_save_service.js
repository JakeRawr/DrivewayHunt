'use strict';

module.exports = function(app) {
  app.factory('ItemSave', ['$http', '$cookies', function() {
    var itemSave = {};

    itemSave.save = function() {

    };

    return itemSave;

  }]);
};
