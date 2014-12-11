'use strict';
//require all modules
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

//general set up
var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.set('jwtSecret', process.env.JWT_SECRET || 'changethisordie');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/notes_development');

//set up middlewares
app.use(passport.initialize());
require('./server/lib/passport')(passport);
var jwtauth = require('./server/lib/jwt_auth')(app.get('jwtSecret'));

//start index.html
//app.use(express.static(__dirname + '/build'));

//set up all routes
require('./server/routes/user_routes')(app, passport);

//start server
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('The server is running on port: ' + app.get('port'));
});
