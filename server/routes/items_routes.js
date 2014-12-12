'use strict';

var Item = require('../models/item');

module.exports = function(app, jwtauth, mongoose) {
  var formParser = require('../lib/form-parser')(mongoose.connection.db, mongoose.mongo);
  var removeImage = require('../lib/remove-image')(mongoose.connection.db, mongoose.mongo);

  /**
   * Post new item into an existing garage sale.
   * Requires garage sale id in request
   * along with other necessary information such as name, price, condition, etc.
   */
  app.post('/api/items', jwtauth, formParser, function(req, res) {
    var newItem = new Item();
    newItem.saleId = req.body.saleId;
    newItem.userId = req.body.userId;
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
   * Return single garage sale item
   */
  app.get('/api/items/single/:id', jwtauth, function(req, res) {
    Item.findById(req.params.id, function(err, item) {
      if (err) return res.status(500).send('there was an error');
      if (!item) return res.status(500).send('item does not exist');
      res.json(item);
    });
  });

  /**
   * Update single garage sale item
   */
  app.put('/api/items/single/:id', jwtauth, formParser, removeImage, function(req, res) {
    var updateItem = req.body;
    if (updateItem.userId !== req.user._id) return res.status(403).send('Not Authorized');

    Item.findByIdAndUpdate(req.params.id, updateItem, function(err, item) {
      if (err) return res.status(500).send('database error');
      if (!item) return res.status(500).send('item does not exist');
      res.json(item);
    });
  });

  /**
   * Delete single garage sale item
   */
  app.delete('/api/items/single/:id', jwtauth, function(req, res) {
    if (req.body.userId !== req.user._id) return res.status(403).send('Not Authorized');

    Item.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.send('success');
    });
  });
};
