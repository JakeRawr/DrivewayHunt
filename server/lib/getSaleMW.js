'use strict';

var Sale = require('../models/sale');
var _ = require('underscore');

module.exports = function() {
  return function(req, res, next) {
    req.user = _.pick(req.user, '_id', 'basic.email', 'firstName', 'lastName');
    req.items = [];
    Sale.find({userId: req.user._id}, function(err, data) {
      req.sales = data; //returns the sales tied to user in an array
      next();
    });
  };
};
