'use strict';

var Sale = require('../models/sale');
var _ = require('underscore');

module.exports = function(req, res, next) {
  req.user.basic = _.pick(req.user.basic, 'email');
  req.user = _.pick(req.user, '_id', 'basic', 'firstName');
  Sale.find({userId: req.user._id}, function(err, data) {
    if (err) return res.status(500).send('database error');
    req.sales = data; //returns the sales tied to user in an array
    next();
  });
};
