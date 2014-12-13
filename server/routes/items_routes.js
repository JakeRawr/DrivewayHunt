'use strict';

var Item = require('../models/item');

module.exports = function(app, jwtauth) {

  /**
   * Post new item into an existing garage sale.
   * Requires garage sale id in request
   * along with other necessary information such as name, price, condition, etc.
   */
  app.post('/api/items', jwtauth, function(req, res) {
    var newItem = new Item();
    newItem.saleId = req.body.saleId;
    newItem.userId = req.user._id;
    newItem.title = req.body.title;
    newItem.askingPrice = req.body.askingPrice;
    newItem.description = req.body.description;
    newItem.condition = req.body.condition;

    newItem.save(function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  /**
   * Return all garage sale items from a sale
   */
  app.get('/api/items/all/:saleid', jwtauth, function(req, res) {
    Item.find({saleId:req.params.saleid}, function(err, items) {
      if (err) return res.status(500).send('there was an error');
      if (!items) return res.status(500).send('This sale has no item');
      res.json(items);
    });
  });

  /**
   * Update single garage sale item
   */
  app.put('/api/items/single/:id', jwtauth, function(req, res) {
    var updateItem = req.body;
    if (String(updateItem.userId) !== String(req.user._id)) return res.status(403).send('Not Authorized');

    Item.findByIdAndUpdate(req.params.id, updateItem, function(err, item) {
      if (err) return res.status(500).send('database error');
      if (!item) return res.status(503).send('item does not exist');
      res.json(item);
    });
  });

  /**
   * Delete single garage sale item
   */
  app.delete('/api/items/single/:id', jwtauth, function(req, res) {
    if (String(req.body.userId) !== String(req.user._id)) return res.status(403).send('Not Authorized');

    Item.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.send('success');
    });
  });
};
