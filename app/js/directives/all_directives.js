'use strict';

module.exports = function(app) {
  require('./modal_login')(app);
  require('./modal_signup')(app);
};
