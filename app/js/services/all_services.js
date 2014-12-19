'use strict';

module.exports = function(app) {
  require('./auth_service')(app);
  require('./sales_search_service')(app);
  require('./item_save_service')(app);
  require('./sale_save_service')(app);
};
