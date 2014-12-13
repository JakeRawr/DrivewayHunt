'use strict';

var Sale = require('../models/sale');
var request = require('request');
module.exports = function(app, jwtauth) {

  /**
   * Return list of sales objects with an input of city, zip, address
   * Non-authenticated
   */
  app.get('/api/sales/:location', function(req, res) {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
              req.params.location + '&key=' + process.env.GEOCODE_API;

    request(url, function(error, response, body) {
      if (error) return res.status(500).send('internal server error');
      var data = JSON.parse(body).results;
      if (data[1]) return res.status(403).send('be more specific');
      if (!data) return res.status(403).send('could not find location');
      var latLng = (data[0].geometry.location);
      var lat = latLng.lat;
      var lng = latLng.lng;
      var geojsonPoly = { type: 'Polygon',
                          coordinates: [[[lng - 0.5, lat + 0.5],
                                         [lng + 0.5, lat + 0.5],
                                         [lng + 0.5, lat - 0.5],
                                         [lng - 0.5, lat - 0.5],
                                         [lng - 0.5, lat + 0.5]]]};
      Sale.find({ loc: { $within: { $geometry: geojsonPoly }}}, function(err, data) {
        res.send(data);
      });
    });
  });

  /**
   * Create a new garage sale
   * Authenticated
   */
  app.post('/api/sales', jwtauth, function(req, res) {
    var newSale = new Sale();

    newSale.userId = req.user._id;
    newSale.title = req.body.title;
    newSale.description = req.body.description;
    newSale.address = req.body.address;
    newSale.city = req.body.city;
    newSale.state = req.body.state;
    newSale.zip = req.body.zip;
    newSale.dateStart = req.body.dateStart;
    newSale.dateEnd = req.body.dateEnd;
    newSale.timeStart = req.body.timeStart;
    newSale.timeEnd = req.body.timeEnd;
    newSale.lat = req.body.lat;
    newSale.lng = req.body.lng;
    newSale.phone = req.body.phone;
    newSale.email = req.body.email;
    newSale.publish = req.body.publish;
    newSale.loc = [req.body.lng, req.body.lat];

    newSale.save(function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  /**
   * Update single sale
   * Authenticated
   */
  app.put('/api/sales/:id', jwtauth, function(req, res) {
    var updatedSale = req.body;
    if (String(updatedSale.userId) !== String(req.user._id)) return res.status(403).send('Not Authorized');
    delete updatedSale._id;
    Sale.findByIdAndUpdate(req.params.id, updatedSale, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      if (!data) return res.status(500).send('database error');
      res.json(data);
    });
  });

  /**
   * Delete single sale
   * Authenticated
   */
  app.delete('/api/sales/:id', jwtauth, function(req, res) {
    if (String(req.body.userId) !== String(req.user._id)) return res.status(403).send('Not Authorized');
    Sale.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.send('success');
    });
  });

};
