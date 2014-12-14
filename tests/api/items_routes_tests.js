/*jshint -W030 */
'use strict';

var fs = require('fs');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

describe('items routes', function() {
  var itemId;

  it('should add an image to a sale item', function(done) {
    chai.request(url)
    .put('/api/items/single/' + itemId)
    .set('jwt', tempJWT)
    .attach('file', __dirname + '/DSCN0119.JPG')
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.not.have.status(500);
      expect(res).to.have.status(200);
      expect(res.body).to.include.keys('img');
      done();
    });
  });

  it('should return an item\'s image given an item id', function(done) {
    chai.request(url)
    .get('/api/items/single/' + itemId)
    .end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.not.have.status(500);
      expect(res).to.have.header('transfer-encoding', 'chunked');
      //create file
      fs.writeFileSync(__dirname + '/testImage.jpeg');
      //make write stream out of file
      var writeStream = fs.createWriteStream(__dirname + '/testImage.jpeg');
      //pipe res into write stream
      res.on('data', function(data) {
        writeStream.write(data);
      });
      //check if that file exists
      res.on('end', function() {
        fs.exists(__dirname + '/testImage.jpeg', function(exists) {
          expect(exists).to.be.true;
          fs.unlinkSync(__dirname + '/testImage.jpeg');
          done();
        });
      });
    });
  });

});
