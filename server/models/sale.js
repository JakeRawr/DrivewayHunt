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
  
  lat: {type: Number, required: true},
  lng: {type: Number, required: true},
  */
  lat: {type: Number, required: true},
  lng: {type: Number, required: true},
  /*
  loc: {
       type: {type:String},
       coordinates: [Number], //[long,lat]
       index: '2dsphere'
  }    // create the geospatial index
  */
  loc: { type: [Number], index: '2dsphere' }

  //publish: {type: Boolean, required: true}
});

saleSchema.methods.add = function(lng,lat) {
  this.loc.type = 'Point';
  this.loc.coordinates.push(lng);
  this.loc.coordinates.push(lat);
}
saleSchema.index({ 'loc': '2dsphere' });
module.exports = mongoose.model('Sale', saleSchema);
