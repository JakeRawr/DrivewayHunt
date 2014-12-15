'use strict';

var Item = require('../models/item');

module.exports = function(app, jwtauth, item) {

  //posts a new Item into an existing Garage Sale. Takes a Garage Sale id in request Body
  // along with other necessary information such as name, price, condition, etc.
  app.post('/newItem', jwtauth, function(req, res) {
    //var user = req.user;
    //do a mongoDB find and save
    res.send('success');
  });

  app.delete('/item/:id', jwtauth, item, function(req, res) {
    if(req.item.userId !== req.user._id) return res.status(403).send('Not Authorized');

    Item.remove({'_id': req.params.id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.send('success');
    });
  });
};
