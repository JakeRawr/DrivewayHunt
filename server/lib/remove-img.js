'use strict';

/*
* Remove image from MongoDB
* Deletes documents from fs.files & fs.chunks collections
*/
var grid = require('gridfs-stream');

module.exports = function(db, driver) {
  return function(req, res, next) {
    //if the image wasn't changed, continue on
    if (!req.body.image) next();

    //otherwise, remove the old image from MongoDB
    var gfs = grid(db, driver);

    gfs.remove({ _id: req.story.img }, function(err) {
      if (err) {
        console.log('error deleting image:', err);
      }
      next();
    });
  };
};