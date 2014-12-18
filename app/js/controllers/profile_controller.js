'use strict';

module.exports = function(app) {
  app.controller('ProfileController', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
    //http call to get user data and list of sales
    //$scope.sales => object array
    //$scope.user => object
    getProfile();

    function getProfile() {
      /*$http.get('/api/users')
      .success(function(data) {
        $scope.sales = data.sales;
        $scope.user = data.user;
        $scope.items = data.items;
      });*/

      $scope.sales = [{id: '1234', title: 'test Sale 1'},
                      {id: '4567', title: 'test Sale 2'}];
      $scope.user = {basic:{email: 'test@example.com'}, firstName: 'Jake', lastName: 'Yang'};
      $scope.activities = ['test activity 1',
                           'test activity 2',
                           'test activity 3',
                           'test activity 4',
                           'test activity 5',
                           'test activity 6',
                           'test activity 7',
                           'test activity 8',
                           'test activity 9',
                           'test activity 10',
                           'test activity 11',
                           'test activity 12',
                           'test activity 13',
                           'test activity 14'];
      $scope.items = [[{img:'http://i.imgur.com/xlPwCD3b.jpg'},{img:'http://i.imgur.com/zCYl13ib.jpg'},{img:'http://i.imgur.com/AepHezBb.jpg'}],
                      [{img:'http://i.imgur.com/r2o9wjhb.jpg'},{img:'http://i.imgur.com/4xri5VCb.jpg'},{img:'http://i.imgur.com/WPywseqb.jpg'}]];
    }

    $scope.getItemThumbnail = function(item) {
      console.log(item);
    };

    $scope.scrollTo = function(id) {
      console.log(id);
      var old = $location.hash();
      $location.hash(id);
      $anchorScroll();
      $location.hash(old);
    };
  }]);
};
