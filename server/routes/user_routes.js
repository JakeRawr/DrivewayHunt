'use strict';

var User = require('../models/user');
var getSale = require('../../server/lib/getSaleMW');
var getItem = require('../../server/lib/getItemMW');

module.exports = function(app, passport, jwtAuth) {
  app.get('/api/users', passport.authenticate('basic', {session: false}), function(req, res) {
    res.json({jwt: req.user.generateToken(app.get('jwtSecret'))});
  });

  app.post('/api/users', function(req, res) {
    User.findOne({'basic.email': req.body.email}, function(err, user) {
      if (err) return res.status(500).send('server error');
      if (user) return res.status(500).send('cannot create that user');

      var newUser = new User();
      newUser.basic.email = req.body.email;
      newUser.basic.password = newUser.generateHash(req.body.password);
      newUser.firstName = req.body.firstName;
      newUser.lastName = req.body.lastName;
      newUser.city = req.body.city;
      newUser.state = req.body.state;
      newUser.zip = req.body.zip;
      newUser.phone = req.body.phone;
      newUser.save(function(err) {
        if (err) return res.status(500).send('server error');
        res.json({jwt: newUser.generateToken(app.get('jwtSecret'))});
      });
    });
  });

  app.get('/api/userInfo', jwtAuth, getSale, getItem, function(req, res) {
    var data = {user: req.user, sales: req.sales, items: req.items};
    console.log(data);
    res.json(data);
  });
};
