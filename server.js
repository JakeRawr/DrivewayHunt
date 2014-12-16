'use strict';

var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var app = express();

/**
 * Parse incoming HTTP requests
 */
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

/**
 * Open connection to Mongo via Mongoose
 */
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/gsale_development');

/**
 * Auth-auth prereqs
 */
app.use(passport.initialize());
require('./server/lib/passport')(passport);
app.set('jwtSecret', process.env.JWT_SECRET || 'changethisordie');
var jwtAuth = require('./server/lib/jwt_auth')(app.get('jwtSecret'));

/**
 * Serve static resources
 */
app.use(express.static(__dirname + '/build'));

/**
 * Require routes
 */
require('./server/routes/user_routes')(app, passport);
require('./server/routes/sales_routes')(app, jwtAuth);
require('./server/routes/items_routes')(app, jwtAuth, mongoose);

app.use(function(err, req, res) {
  console.log(err);
  res.status(500).send('server error');
});

/**
 * Start server and export app for unit testing
 */
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('The server is running on port: ' + app.get('port'));
});

module.exports = app;
