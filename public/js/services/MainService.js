angular.module('MainService', []).factory('Main', ['$http', function($http) {

    return {
        // call to get all
        get : function() {
            return $http.get('/api').success(function(response){

              angular.copy(response, Main.cutups)
            })
        },
        cutups : {}
    }

}]);
