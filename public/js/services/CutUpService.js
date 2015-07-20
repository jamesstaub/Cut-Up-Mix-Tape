angular.module('cutupApp').factory('CutUp', ['$http', function($http) {
    cutupFactory = {};

    cutupFactory.get = function() {
      return $http.get('/api/cutups');
      };

    cutupFactory.getSingle = function(postID) {
      return $http.get('/api/cutups/'+ postID);
      };

    // cutupFactory.cutup = [];

    return cutupFactory;

}]);
