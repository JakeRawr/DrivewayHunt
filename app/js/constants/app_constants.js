'use strict';

module.exports = function(app) {
  app.constant('EVENTS', {
    loginSuccess: 'auth-login-sucess',
    loginFailure: 'auth-login-failure',
    logoutSuccess: 'auth-logout-sucess',
    loginAttempt: 'auth-login-attempt',
    signupAttempt: 'auth-signupAttempt',
    itemEditAttempt: 'item-editAttempt',
    itemEditFinished: 'item-editFinished',
    profileClick: 'profile-button-clicked'
  });
};
