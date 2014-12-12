'use strict';

var Item = require('../models/item');

module.exports = function(app, jwtauth) {

  //posts a new Item into an existing Garage Sale. Takes a Garage Sale id in request Body
  // along with other necessary information such as name, price, condition, etc.
  app.post('/newItem', jwtauth, function(req, res) {
    var item = new Item();

    item.saleId = req.body.saleId;
    item.userId = req.body.userId;
    item.title = req.body.title;
    item.askingPrice = req.body.askingPrice;
    item.description = req.body.description;
    //item.img
    item.condition = req.body.condition;
    item.save(function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.get('/listItems/sale/:id', jwtauth, function(req, res) {
    Item.find({saleId: req.params.id}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.put('/item/:id', jwtauth, function(req, res) {
    var item = req.body;
    if (item.userId !== req.user._id) return res.status(403).send('Not Authorized');
    delete item._id;
    Item.findOneAndUpdate({_id: req.params.id}, item, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.delete('/item/:id', jwtauth, function(req, res) {
    var item = req.body;
    if (item.userId !== req.user._id) return res.status(403).send('Not Authorized');
    delete item._id;

    Item.remove({_id: req.params.id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.send('success');
    });
  });
};
