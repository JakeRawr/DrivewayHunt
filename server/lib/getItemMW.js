'use strict';

var Items = require('../models/item');
// var _ = require('lodash');

module.exports = function(req, res, next) {
  //for each sale, return the items in an array
  // req.items = [];

  // var queryObj = _.map(req.sales, function(sale) {
  //   return _.pick(sale, '_id');
  // });

  // Items.find(queryObj, function(err, data) {
  //   if (err) return res.status(500).send('database error');
  //   req.items.push(data);
  //   next();
  // });
  Items.find({userId: req.user._id}, function(err, data) {
    if (err) return res.status(500).send('database error');
    req.items = data;
    next();
  });
};
