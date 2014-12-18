'use strict';
/* jshint ignore:start */
var Items = require('../models/item');
var _ = require('underscore');

module.exports = function() {
  return function(req, res, next) {
    //for each sale, return the items in an array
    for (var i = 0; i < req.sales.length; i++) {
      req.sales[i] = _.pick(req.sales[i], '_id', ' userId', 'description', 'title');
      Items.find({saleId: req.sales[i]._id}, function(err, data) {
        req.items.push(data);
        next();
      });
    }
  };
};
/* jshint ignore:end */
