/*jshint -W030*/
/*jshint -W079*/
'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);
require('../../server');

var url = 'http://localhost:3000';

process.env.MONGO_URL = 'mongodb://localhost/gsale_test';

describe('items routes', function() {
  var jwt;
  var testUser;
  var testItem;
  var testSale;

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

    testUser = {
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

    testItem = {
      saleId: null,
      title: 'applePie',
      askingPrice: 3.14,
      description: 'This is an apple pie',
      condition: 'New'
    };

    testSale = {
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
        expect(res.body._id).to.be.an('string');
        testItem.saleId = res.body._id;
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

  it('should get all items by a saleId', function(done) {
    chai.request(url)
      .get('/api/items/all/' + testItem.saleId)
      .set('jwt', jwt)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(403);
        expect(res).to.not.have.status(500);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.eql(testItem);
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
        expect(res.body.askingPrice).to.eql(3.14);
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
