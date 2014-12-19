'use strict';

var request = require('request');

module.exports = function(req, res, next) {
  console.log(req.body.city);
  console.log(req.body.state);
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.body.city + '+' + req.body.state + '+' + req.body.zip + '&key=' + process.env.GEOCODE_API;
  request(url, function(err, response, body) {
    var data = JSON.parse(body).results;
    if (err) return res.status(500).send('server error');
    if (!data) return res.status(403).send('could not find location');
    var latLng = (data[0].geometry.location);
    var lat = latLng.lat;
    var lng = latLng.lng;
    req.loc = [lng, lat];
    next();
  });
};
