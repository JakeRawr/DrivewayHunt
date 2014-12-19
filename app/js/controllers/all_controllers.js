'use strict';

module.exports = function(app) {
  require('./app_controller')(app);
  //require('./item_controller')(app);
  require('./upload_gallery_controller')(app);
  require('./user_controller')(app);
  require('./search_controller')(app);
  require('./profile_controller')(app);
  require('./user_resources_controller')(app);
};
