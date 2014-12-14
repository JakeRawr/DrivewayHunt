'use strict';

/**
* Pull image data off request object
* Incoming multipart form data
*/
var Busboy = require('busboy');

module.exports = function(db, driver) {
  return function(req, res, next) {

    //will only parse req's that have 'content-type' set to 'multipart/form-data'
    if (!/multipart\/form\-data/.test(req.headers['content-type'])) return next();
    req.body = req.body || {};
    var busboy = new Busboy({ headers: req.headers });

    busboy.on('file', function(fieldname, file) {
      var image = '';

      file.on('data', function(data) {
        image += data;
      });

      file.on('end', function() {
        req.body.img = image;
        next();
      });
    });

    req.pipe(busboy);
  };
};
