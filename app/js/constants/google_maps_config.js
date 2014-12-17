'use strict';

module.exports = function(app) {
  app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDxYYhIoY5cEDP5GIszT2RA7R3UGc3PcEw',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
  });
};
