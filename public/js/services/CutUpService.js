angular.module('CutUpService', []).factory('CutUp', ['$http', function($http) {

    factory = {};
    factory.get = function() {
        return $http.get('/api').success(function(response){
          angular.copy(response, factory.cutup)
        });
    };

    factory.cutup = [];

    return factory;

}]);
