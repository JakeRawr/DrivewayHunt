'use strict';

var Sale = require('../models/sale');

module.exports = function() {
  return function(req, res, next) {
    req.items = [];
    Sale.find({userId: req.user._id}, function(err, data) {
      req.sales = data; //returns the sales tied to user in an array
      next();
    });
  };
};
