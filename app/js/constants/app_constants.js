'use strict';

module.exports = function(app) {
  app.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-sucess',
    loginFailure: 'auth-login-failure',
    logoutSuccess: 'auth-logout-sucess'
  });
};
