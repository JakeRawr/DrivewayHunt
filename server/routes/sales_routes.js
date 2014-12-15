'use strict';

//var Sale = require('../models/sale');
var request = require('request');

module.exports = function(app, jwtauth, sale) {
  //Returns list of sales objects with an input of city, zip, address
  app.get('/search/sales/:location', function(req, res) {
    var location = req.params.location;
    ///////api key should be envi ronmental variable/////
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
    //var user = req.user;
    //do a mongoDB Save into the Sales Colection
    res.send('send');
  });

  //submits a sale for the public to view
  app.put('/modifyPublish', jwtauth, sale, function(req, res) {
    if(req.sale.userId !== req.user._id) return res.status(403).send('Not Authorized');
    req.sale.publish = req.body.publish;
    req.sale.save(function(err) {
        if (err) return res.status(500).send('server error');
        res.send('success');
    });
  });

  //edit and existing sale
  app.put('/editSale/:id', jwtauth, function(req, res) {
    //var user = req.user;
    //findOneAndUpdate in mongoDB given a sale id in req.params
    res.send('success');
  });

};
