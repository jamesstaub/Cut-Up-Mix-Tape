angular.module('CutUpService', []).factory('CutUp', ['$http', function($http) {

    factory = {};

        // call to get all nerds
    factory.get = function() {
        return $http.get('/api').success(function(response){
          angular.copy(response, factory.cutup)
        })
    };

    factory.cutup = []

    return factory;

}]);
