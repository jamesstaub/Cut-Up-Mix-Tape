angular.module('cutupApp').factory('GeniusApi', ['$http', function($http) {

    geniusResponseFactory = {};
    geniusResponseFactory.get = function(searchStr) {
        return $http.get('/api/stanzas/'+ searchStr);
    };

    // geniusResponseFactory.geniusResults = [];
    return geniusResponseFactory;

}]);


