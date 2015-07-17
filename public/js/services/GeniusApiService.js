angular.module('cutupApp').factory('GeniusApi', ['$http', function($http) {

    geniusResponseFactory = {};
    geniusResponseFactory.get = function(searchStr) {
        return $http.get('/api/stanzas/'+ searchStr);
    }

    geniusResponseFactory.post = function(cutup){
      return $http.post('/api/cutups', cutup)
    }

    geniusResponseFactory.parseString = function(msg){
      var segments = msg.match(/[^ ]+( +[^ ]+){0,4}/g);
      return segments;
    }

    // geniusResponseFactory.geniusResults = [];
    return geniusResponseFactory;

}]);


