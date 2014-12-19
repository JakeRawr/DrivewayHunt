/*jshint -W030*/
/*jshint -W079*/
'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var nock = require('nock');

var url = 'http://localhost:3000';

chai.use(chaiHttp);
require('../../server');
describe('sales routes', function() {
  before(function() {
    //drop sales from test db before running tests
    mongoose.connection.collections.sales.drop(function(err) {
      if (err) console.log(err);
    });
    //drop users from test db before running tests
    mongoose.connection.collections.users.drop(function(err) {
      if (err) console.log(err);
    });
  });

  var geoUrl = 'https://maps.googleapis.com';
  var jwt;
  var cachedSaleId;
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
    title: 'New York Test Sale',
    description: 'This is a test sale in NY',
    address: '612 Westlake Avenue South, Albany, NY 023893',
    city: 'Albany',
    state: 'NY',
    zip: '02020',
    dateStart: '1-1-15',
    dateEnd: '1-2-15',
    timeStart: '955',
    timeEnd: '955',
    lat: '40.7',
    lng: '-74',
    phone: '123-123-1234',
    email: 'email@email.com',
    publish: 'true'
  };

  before(function() {
    nock(geoUrl)
    .get('/maps/api/geocode/json?address=Albany+NY+02020&key=' + process.env.GEOCODE_API)
    .reply(200, {results:[{geometry:{location:{lat: 40.7234, lng: -74.23243}}}]});

    nock(geoUrl)
    .get('/maps/api/geocode/json?address=Seattle+WA+98109&key=' + process.env.GEOCODE_API)
    .reply(200, {results:[{geometry:{location:{lat: 47.6062095, lng: -122.3320708}}}]});

    nock(geoUrl)
    .get('/maps/api/geocode/json?address=Seattle&key=' + process.env.GEOCODE_API)
    .reply(200, {results:[{geometry:{location:{lat: 47.6062095, lng: -122.3320708}}}]});
  });

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
        expect(res.body.title).to.eql('Test Sale');
        cachedSaleId = res.body._id;
        testSale = res.body;
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
        expect(res.body.title).to.eql('New York Test Sale');
        testSale2 = res.body;
        done();
      });
  });

  it('should be able to list only sales near Seattle', function(done) {
    chai.request(url)
      .get('/api/sales/Seattle')
      .end(function(err, res) {
        expect(res).to.not.have.status(500);
        expect(res.body[0]).to.be.an('object');
        expect(res.body).to.be.an('array')
          .and.to.have.length(1)
          .with.deep.property('[0].city')
          .that.deep.equals('Seattle');
        done();
      });
  });

  it('should be able to update a single sale', function(done) {
    var updatedTestSale = testSale;
    updatedTestSale.title = 'Updated Test Sale';
    chai.request(url)
      .put('/api/sales/' + testSale._id)
      .set('jwt', jwt)
      .send(updatedTestSale)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(403);
        expect(res).to.not.have.status(500);
        expect(res.body.title).to.eql('Updated Test Sale');
        expect(res.body._id).to.eql(cachedSaleId);
        done();
      });
  });

  it('should be able to delete a sale', function(done) {
    chai.request(url)
      .delete('/api/sales/' + testSale._id)
      .set('jwt', jwt)
      .send({userId: testSale.userId})
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(403);
        expect(res).to.not.have.status(500);
        expect(res.text).to.eql('success');
        done();
      });
  });
});
