'use strict';

var Sale = require('../models/sale');
var request = require('request');

module.exports = function(app, jwtauth) {
  //Returns list of sales objects with an input of city, zip, address
  app.get('/search/sales/:location', function(req, res) {
    var location = req.params.location;
    ///////api key should be environmental variable/////
    request('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyDxYYhIoY5cEDP5GIszT2RA7R3UGc3PcEw',
    function(error, response, body) {
      if (error) return res.status(500).send('internal server error');
      var data = JSON.parse(body).results[0];
      if (!data) return res.status(403).send('could not find location');
      var latLng = (data.geometry.location);
      var lat = latLng.lat;
      var lng = latLng.lng;
      res.send({lat:lat, lng:lng});
    });
  });

  //Creates a new Garage Sale with the necessary information in the request Body
  //such as location, name, user, etc.
  app.post('/newSale', jwtauth, function(req, res) {
    var sale = new Sale();

    req.sale.userId = req.body.userId;
    req.sale.title = req.body.title;
    req.sale.description = req.body.description;
    req.sale.address = req.body.sale;
    req.sale.city = req.body.city;
    req.sale.state = req.body.state;
    req.sale.zip = req.body.zip;
    req.sale.dataStart = req.body.dataStart;
    req.sale.dateEnd = req.body.dateEnd;
    req.sale.timeStart = req.body.timeStart;
    req.sale.timeEnd = req.body.timeEnd;
    req.sale.lat = req.body.lat;
    req.sale.lng = req.body.lng;
    req.sale.phone = req.body.phone;
    req.sale.email = req.body.email;
    req.sale.publish = req.body.publish;

    sale.save(function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.put('/sale/:id', jwtauth, function(req, res) {
    var sale = req.body;
    if(sale.userId !== req.user._id) return res.status(403).send('Not Authorized');
    delete sale._id;
    Sale.findOneAndUpdate({'_id': req.params.id}, sale, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.delete('/sale/:id', jwtauth, function(req, res) {
    var sale = req.body;
    if(sale.userId !== req.user._id) return res.status(403).send('Not Authorized');
    delete sale._id;

    Sale.remove({'_id': req.params.id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.send('success');
    });
  });

};
