'use strict';

var mongoose = require('mongoose');

var saleSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: {type: String, required: true},
  description: {type: String, required: true},
  address: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  zip: {type: Number, required: true},
  dateStart: {type: Date, required: false},
  dateEnd: {type: Date, required: false},
  timeStart: {type: Date, required: false},
  timeEnd: {type: Date, required: false},
  phone: {type: String, required: false},
  email: {type: String, required: false},
  publish: {type: Boolean, required: true},
  loc: { type: [Number], index: '2dsphere'}
});

module.exports = mongoose.model('Sale', saleSchema);
