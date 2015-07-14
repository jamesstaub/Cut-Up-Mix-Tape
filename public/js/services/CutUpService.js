angular.module('cutupApp').factory('CutUp', ['$http', function($http) {
    cutupFactory = {};

    cutupFactory.get = function() {
      return $http.get('/api/cutups');
      };

    // cutupFactory.cutup = [];

    return cutupFactory;

}]);
