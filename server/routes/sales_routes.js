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
      var data = JSON.parse(body).results;
      if(data[1]) return res.status(403).send('be more specific')
      if (!data) return res.status(403).send('could not find location');
      var latLng = (data[0].geometry.location);
      var lat = latLng.lat;
      var lng = latLng.lng;
      Sale.find({lat: lat < lat + .3|| lat > lat - .3, lng: lng < lng + .3 || lng > lng - .3 }, function(err, data) {
        if (err) console.log(err); return res.status(500).send('there was an error');
        res.json(data);
      })

      //res.send({lat:lat, lng:lng});
    });
  });

  //Creates a new Garage Sale with the necessary information in the request Body
  //such as location, name, user, etc.
  app.post('/newSale', jwtauth, function(req, res) {
    //var user = req.user;
    //do a mongoDB Save into the Sales Colection
    res.send('send');
  });

  //posts a new Item into an existing Garage Sale. Takes a Garage Sale id in request Body
  // along with other necessary information such as name, price, condition, etc.
  app.post('/newItem', jwtauth, function(req, res) {
    //var user = req.user;
    //do a mongoDB find and save
    res.send('success');
  });

  //submits a sale for the public to view
  app.post('/submitSale', jwtauth, function(req, res) {
    //var user = req.user;
    //mongoDB save into Sales Collection with Boolean flag set to True;
    res.send('success');
  });

  //edit and existing sale
  app.put('/editSale:id', jwtauth, function(req, res) {
    //var user = req.user;
    //findOneAndUpdate in mongoDB given a sale id in req.params
    res.send('success');
  });

};
