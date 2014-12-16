'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var app = angular.module('drivewayApp', ['ngRoute', 'ngCookies', 'base64']);

//constants
require('./constants/app_constants')(app);

//services
require('./services/all_services')(app);

//controllers
require('./controllers/all_controllers')(app);

//directives
//require('./directives/all_directives')(app);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'js/templates/home.html'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);
