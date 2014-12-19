/*jshint -W030*/
/*jshint -W079*/
'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var nock = require('nock');

chai.use(chaiHttp);
require('../../server');

var url = 'http://localhost:3000';

describe('items routes', function() {
  var jwt;
  var geoUrl = 'https://maps.googleapis.com';

  /*
  before(function() {
    mongoose.connection.collections.users.drop(function(err) {
      if (err) console.log(err);
    });
    mongoose.connection.collections.sales.drop(function(err) {
      if (err) console.log(err);
    });
    mongoose.connection.collections.items.drop(function(err) {
      if (err) console.log(err);
    });
  });
*/
  var testUser = {
    email: 'item@example.com',
    password: 'foobar123',
    passwordConfirm: 'foobar123',
    firstName: 'Test',
    lastName: 'Example',
    city: 'Seattle',
    state: 'WA',
    zip: '98122',
    phone: '206-123-1234'
  };

  var testItem = {
    saleId: null,
    title: 'applePie',
    askingPrice: 3.14,
    description: 'This is an apple pie',
    condition: 'New',
    img: 'http://i.imgur.com/xlPwCD3b.jpg'
  };

  var testItem2 = {
    saleId: null,
    title: 'CoffeePie',
    askingPrice: 5.14,
    description: 'This is an coffee pie',
    condition: 'New',
    img: 'http://i.imgur.com/r2o9wjhb.jpg'
  };

  var testSale = {
    title: 'Capitol Hill Garage Sale',
    description: 'Come and buy my stuff',
    address: '244 Pike, Seattle, WA 98122',
    city: 'Seattle',
    state: 'WA',
    zip: '98109',
    dateStart: '11-05-14',
    dateEnd: '11-06-14',
    timeStart: '234',
    timeEnd: '345',
    lat: '47.609',
    lng: '-122.331',
    phone: '123-123-1234',
    email: 'klsdfwek@wfj.com',
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

  before(function() {
    nock(geoUrl)
    .get('/maps/api/geocode/json?address=Seattle+WA+98109&key=' + process.env.GEOCODE_API)
    .reply(200, {results:[{geometry:{location:{lat: 47.6062095, lng: -122.3320708}}}]});

    nock(geoUrl)
    .get('/maps/api/geocode/json?address=Seattle&key=' + process.env.GEOCODE_API)
    .reply(200, {results:[{geometry:{location:{lat: 47.6062095, lng: -122.3320708}}}]});
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
        expect(res.body).to.include.keys('title', '_id');
        expect(res.body.title).to.eql('Capitol Hill Garage Sale');
        testItem.saleId = res.body._id;
        testItem2.saleId = res.body._id;
        done();
      });
  });

  it('should be able to post an item', function(done) {
    chai.request(url)
      .post('/api/items')
      .set('jwt', jwt)
      .send(testItem)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(403);
        expect(res).to.not.have.status(500);
        expect(res.body).to.be.an('object');
        expect(res.body.title).to.eql('applePie');
        expect(res.body.userId).to.be.an('string');
        expect(res.body.saleId).to.be.an('string');
        testItem = res.body;
        done();
      });
  });

  it('should be able to post an item again', function(done) {
    chai.request(url)
      .post('/api/items')
      .set('jwt', jwt)
      .send(testItem2)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(403);
        expect(res).to.not.have.status(500);
        expect(res.body).to.be.an('object');
        expect(res.body.title).to.eql('CoffeePie');
        expect(res.body.userId).to.be.an('string');
        expect(res.body.saleId).to.be.an('string');
        done();
      });
  });

  it('should get all items by a saleId', function(done) {
    chai.request(url)
      .get('/api/items/all/' + testItem.saleId)
      .set('jwt', jwt)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(403);
        expect(res).to.not.have.status(500);
        expect(res.body.items).to.be.an('array');
        expect(res.body.items[0]).to.eql(testItem);
        done();
      });
  });

  it('should be able to modify an item', function(done) {
    testItem.title = 'orangePie';
    testItem.condition = 'Old';
    testItem.description = 'This is an orange pie';
    chai.request(url)
      .put('/api/items/single/' + testItem._id)
      .set('jwt', jwt)
      .send(testItem)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(403);
        expect(res).to.not.have.status(500);
        expect(res.body).to.be.an('object');
        expect(res.body.title).to.eql('orangePie');
        expect(res.body.condition).to.eql('Old');
        done();
      });
  });

  it('should be able to delete an item', function(done) {
    chai.request(url)
      .delete('/api/items/single/' + testItem._id)
      .set('jwt', jwt)
      .send({userId:testItem.userId})
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(403);
        expect(res).to.not.have.status(500);
        expect(res.text).to.eql('success');
        done();
      });
  });

});
