'use strict';

//var Sale = require('../models/sale'); 
var request = require('request');

module.exports = function(app) {
  //Returns list of sales objects with an input of city, zip, address
  app.get('/search/sales/:location', function(req, res) {
    var location = req.params.location;
    var lat;
    var lng;
    ///////api key should be environmental variable/////
    request('https://maps.googleapis.com/maps/api/geocode/json?address='+location+'&key=AIzaSyDxYYhIoY5cEDP5GIszT2RA7R3UGc3PcEw',
    function(error,response,body) {
      if (!error && response.statusCode == 200) {
        var latLng = (JSON.parse(body).results[0].geometry.location);
        lat = latLng.lat;
        lng = latLng.lng;
        res.send({lat:lat, lng:lng});
      }else{
        return res.send(error);
      }
    });
  });

  //Creates a new Garage Sale with the necessary information in the request Body
  //such as location, name, user, etc.
  app.post('/newSale', function(req, res) {
    //do a mongoDB Save into the Sales Colection
    res.send('success');
  });

  //posts a new Item into an existing Garage Sale. Takes a Garage Sale id in request Body
  // along with other necessary information such as name, price, condition, etc.
  app.post('/newItem', function(req ,res) {
    //do a mongoDB find and save
  });

  //submits a sale for the public to view
  app.post('/submitSale', function(req, res) {
    //mongoDB save into Sales Collection with Boolean flag set to True;
  });

  //edit and existing sale
  app.put('/editSale:id',  function(req, res) {
    //findOneAndUpdate in mongoDB given a sale id in req.params
  });

};







