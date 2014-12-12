'use strict';

var mongoose = require('mongoose');

var saleSchema = mongoose.Schema({
  /*
  userId: mongoose.Schema.Types.ObjectId,
  title: {type: String, required: true},
  description: {type: String, required: true},
  address: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  zip: {type: Number, required: true},
  dateStart: {type: Date, required: true},
  dateEnd: {type: Date, required: true},
  timeStart: {type: Date, required: false},
  timeEnd: {type: Date, required: false},
  lat: {type: Number, required: true},
  lng: {type: Number, required: true},
  phone: {type: String, required: false},
  email: {type: String, required: false},
  */
   loc: {
      type: { type: String },
      coordinates: [] //[long,lat]
      //,index: '2dsphere'
  }    // create the geospatial index
  /*
  loc: { type: [Number], index: '2dsphere' }
  */
});
saleSchema.index({ 'loc': '2dsphere' });
module.exports = mongoose.model('Sale', saleSchema);
