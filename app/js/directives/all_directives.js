'use strict';

module.exports = function(app) {
  require('./search_results_directive')(app);
  require('./results_map_directive')(app);
};
