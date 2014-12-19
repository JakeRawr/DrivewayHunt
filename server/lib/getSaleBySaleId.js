'use strict';

var Sale = require('../models/sale');

module.exports = function(req, res, next) {
  Sale.find({_id: req.params.saleid}, function(err, data) {
    if (err) return res.status(500).send('database error');
    req.sale = data; //returns the sales tied to user in an array
    next();
  });
};
