/*jshint -W030*/
/*jshint -W079*/
'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

var url = 'http://localhost:3000';
process.env.MONGO_URL = 'mongodb://localhost/gsale_test';
chai.use(chaiHttp);
require('../../server');

//drop sales from test db before running tests
mongoose.connection.collections.sales.drop(function(err) {
  if (err) return err;
});

//drop users from test db before running tests
mongoose.connection.collections.users.drop(function(err) {
  if (err) return err;
});

describe('sales routes', function() {
  var jwt;
  var saleId;
  var userId;
  var testUser = {
    email: 'sales@example.com',
    password: 'foobar123',
    passwordConfirm: 'foobar123',
    firstName: 'Test',
    lastName: 'Example',
    city: 'Seattle',
    state: 'WA',
    zip: '98122',
    phone: '206-123-1234'
  };

  var testSale = {
    title: 'Test Sale',
    description: 'This is a test sale',
    address: '511 Boren Avenue North, Seattle, WA 98109 ',
    city: 'Seattle',
    state: 'WA',
    zip: '98109',
    dateStart: '12-14-14',
    dateEnd: '12-15-14',
    timeStart: '955',
    timeEnd: '955',
    lat: '47.609',
    lng: '-122.331',
    phone: '123-123-1234',
    email: 'email@email.com',
    publish: 'true'
  };

  var testSale2 = {
    title: 'Farther Test Sale',
    description: 'This is a test sale',
    address: '511 Boren Avenue North, Seattle, WA 98109 ',
    city: 'Seattle',
    state: 'WA',
    zip: '98109',
    dateStart: '12-14-14',
    dateEnd: '12-15-14',
    timeStart: '955',
    timeEnd: '955',
    lat: '49.609',
    lng: '-122.831',
    phone: '123-123-1234',
    email: 'email@email.com',
    publish: 'true'
  };

  it('should add a new user', function(done) {
    chai.request(url)
      .post('/api/users')
      .send(testUser)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(500);
        expect(res.body).to.have.property('jwt')
          .that.is.a('string');
        jwt = res.body.jwt;
        done();
      });
  });

  it('should be able to create a new sale', function(done) {
    chai.request(url)
      .post('/api/sales')
      .set('jwt', jwt)
      .send(testSale)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(403);
        expect(res).to.not.have.status(500);
        expect(res.body).to.be.an('object');
        saleId = res.body._id;
        userId = res.body.userId;
        testSale = res.body;
        expect(res.body.title).to.eql('Test Sale');
        done();
      });
  });

  it('should be able to create another new, farther sale', function(done) {
    chai.request(url)
      .post('/api/sales')
      .set('jwt', jwt)
      .send(testSale2)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(403);
        expect(res).to.not.have.status(500);
        expect(res.body).to.be.an('object');
        expect(res.body.title).to.eql('Farther Test Sale');
        done();
      });
  });

  //seattle: -122.3331, 47.6097 (lng,lat)
  it.skip('should be able to list only sales near Seattle', function(done) {
    chai.request(url)
      .get('/api/sales/Seattle')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(500);
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0].title).to.eql('Test Sale');
        done();
      });
  });

  it('should be able to update a single sale', function(done) {
    var updatedTestSale = testSale;
    updatedTestSale.title = 'Updated Test Sale';
    chai.request(url)
      .put('/api/sales/' + saleId)
      .set('jwt', jwt)
      .send(updatedTestSale)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(403);
        expect(res).to.not.have.status(500);
        expect(res.body.title).to.eql('Updated Test Sale');
        done();
      });
  });

  it('should be able to delete a sale', function(done) {
    chai.request(url)
      .delete('/api/sales/' + saleId)
      .set('jwt', jwt)
      .send({userId: userId})
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(403);
        expect(res).to.not.have.status(500);
        expect(res.text).to.eql('success');
        done();
      });
  });

});
