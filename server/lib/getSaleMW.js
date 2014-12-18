'use strict';

var Sale = require('../models/sale');
var _ = require('underscore');

module.exports = function(req, res, next) {
  req.user = _.pick(req.user, '_id', 'basic.email', 'firstName', 'lastName');
  Sale.find({userId: req.user._id}, function(err, data) {
    if (err) return res.status(500).send('database error');
    console.log('sales', data);
    req.sales = data; //returns the sales tied to user in an array
    next();
  });
};
