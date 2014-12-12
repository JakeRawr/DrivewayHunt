'use strict';

var Sale = require('../models/sale');
var request = require('request');
module.exports = function(app, jwtauth) {
  //Returns list of sales objects with an input of city, zip, address
  app.get('/search/sales/:location', function(req, res) {
    var location = req.params.location;
    request('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=' + process.env.GEOCODE_API,
    function(error, response, body) {
      if (error) return res.status(500).send('internal server error');
      var data = JSON.parse(body).results;
      if(data[1]) return res.status(403).send('be more specific')
      if (!data) return res.status(403).send('could not find location');
      var latLng = (data[0].geometry.location);
      var lat = latLng.lat;
      var lng = latLng.lng;
      var box1 = [lat + .3, lat - .3];
      var box2 = [lng + .3, lng - .3];
      /*
      Sale.find({},function(err,data) {
        res.send(data);
      })
    */
    });
  });

  //Creates a new Garage Sale with the necessary information in the request Body
  //such as location, name, user, etc.
  app.post('/newSale', function(req, res) {
    var sale = new Sale();

    sale.userId = req.body.userId;
    sale.title = req.body.title;
    sale.description = req.body.description;
    sale.address = req.body.sale;
    sale.city = req.body.city;
    sale.state = req.body.state;
    sale.zip = req.body.zip;
    sale.dateStart = req.body.dateStart;
    sale.dateEnd = req.body.dateEnd;
    sale.timeStart = req.body.timeStart;
    sale.timeEnd = req.body.timeEnd;
    sale.lat = req.body.lat;
    sale.lng = req.body.lng;
    sale.phone = req.body.phone;
    sale.email = req.body.email;
    sale.publish = req.body.publish;
    sale.add(req.body.lng,req.body.lat);
    console.log(sale);

    sale.save(function(err, data) {
      if (err) console.log(err); return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.put('/sale/:id', jwtauth, function(req, res) {
    var sale = req.body;
    if (sale.userId !== req.user._id) return res.status(403).send('Not Authorized');
    delete sale._id;

    Sale.findOneAndUpdate({_id: req.params.id}, sale, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.delete('/sale/:id', jwtauth, function(req, res) {
    var sale = req.body;
    if (sale.userId !== req.user._id) return res.status(403).send('Not Authorized');
    delete sale._id;

    Sale.remove({_id: req.params.id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.send('success');
    });
  });

};
