'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

var userSchema = mongoose.Schema({
  basic: {
    email: String,
    password: String
  },
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  zip: Number,
  phone: String
  //didn't include calendar
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.generateToken = function(secret) {
  var self = this;
  var token = jwt.encode({
    iss: self._id
  }, secret);
  return token;
};

module.exports = mongoose.model('User', userSchema);
