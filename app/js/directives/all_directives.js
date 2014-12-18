'use strict';

module.exports = function(app) {
  require('./search_results_directive')(app);
  require('./modal_login')(app);
  require('./modal_signup')(app);
  require('./user_profile_landing_directive')(app);
};
