'use strict';

module.exports = function(app) {
  app.directive('userAddNewSale', ['$cookies', function($cookies) {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'js/templates/user_add_new_sale_form.html',
      link: function(scope) {
        if (!scope) return;
        scope.saleInfo = scope.sales[$cookies.currentSale];
        scope.saveNewEvent = scope.$parent.saveNewEvent;
      }
    };
  }]);
};
