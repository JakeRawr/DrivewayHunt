'use strict';

var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  saleId: mongoose.Schema.Types.ObjectId,
  title: {type: String, required: true},
  askingPrice: {type: Number, min: 0},
  description: {type: String, required: false},
  img: mongoose.Schema.Types.ObjectId,
  condition: {type: String, required: false}
});


module.exports = mongoose.model('Item', itemSchema);
