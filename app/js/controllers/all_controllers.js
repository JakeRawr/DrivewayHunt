'use strict';

module.exports = function(app) {
  require('./app_controller')(app);
  //require('./item_controller')(app);
  //require('./sale_controller')(app);
  require('./user_controller')(app);
  require('./search_controller')(app);
};
