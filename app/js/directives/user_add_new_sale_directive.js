'use strict';

module.exports = function(app) {
  app.directive('userAddNewSale', function() {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'js/templates/user_add_new_sale_form.html'
    };
  });
};
