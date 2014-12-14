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

//drop users from test db before running tests
mongoose.connection.collections.users.drop(function(err) {
  if (err) return err;
});

describe('user routes', function() {
  var jwt;
  var testUser = {
    email: 'users@example.com',
    password: 'foobar123',
    passwordConfirm: 'foobar123',
    firstName: 'Test',
    lastName: 'Example',
    city: 'Seattle',
    state: 'WA',
    zip: '98122',
    phone: '206-123-1234'
  };

  it('should add a new user', function(done) {
    chai.request(url)
      .post('/api/users')
      .send(testUser)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(403);
        expect(res).to.not.have.status(500);
        expect(res.body).to.have.property('jwt')
          .that.is.a('string');
        jwt = res.body.jwt;
        done();
      });
  });

  it('should authenticate an existing user', function(done) {
    chai.request(url)
      .get('/api/users')
      .auth('users@example.com', 'foobar123')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.not.have.status(403);
        expect(res).to.not.have.status(500);
        expect(res.body).to.have.property('jwt');
        done();
      });
  });
});
