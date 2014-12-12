'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

var url = 'http://localhost:3000';
process.env.MONGO_URL = 'mongodb://localhost/gsale_test';
chai.use(chaiHttp);
require('../../server');


mongoose.connection.collections['sales'].drop(function(err) {
  if (err) return err;
});

describe('sales routes', function() {

  var testSale = {
    userId: 'test', 
    title: 'Test Sale',
    description: 'This is a test sale',
    address: '511 Boren Avenue North, Seattle, WA 98109 ',
    city: 'Seattle',
    state: 'WA',
    //zip: '98109',
    dateStart: '12-14-14',
    dateEnd: '12-15-14',
    timeStart: '9:55 A.M.',
    timeEnd: '9:55 A.M.',
    lat: '47.609',
    lng: '-122.331',
    phone: '123-123-1234',
    email: 'email@email.com',
    publish: 'true'
  };

  it('should be able to create a new sale', function(done) {
    chai.request(url)
      .post('/newSale')
      .send(testSale)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(403);
        console.log(res.body);
        done();
      });
  });

});