angular.module('cutupApp').factory('GeniusApi', ['$http', function($http) {

    geniusResponseFactory = {};
    geniusResponseFactory.get = function(searchStr) {
        return $http.get('/api/stanzas/'+ searchStr);
    }

    geniusResponseFactory.post = function(cutup){
      return $http.post('/api/cutups', cutup)
    }

    geniusResponseFactory.parseString = function(len, msg){
      var a = msg.split(' ');
      var segments = [];
      var seg = '';

  // this is a shit solution for the time being
      for(var i=0; i < a.length; i++){
        seg += a[i]+' ';
        if(i % len === len -1){
          console.log("push")
          segments.push(seg);
          seg = '';
        }
      }
      return segments;
    }

    // geniusResponseFactory.geniusResults = [];
    return geniusResponseFactory;

}]);


