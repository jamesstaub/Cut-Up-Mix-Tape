// public/js/services/NerdService.js
angular.module('CutUpService', []).factory('CutUp', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/cutups');
        },


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(cutupData) {
            return $http.post('/api/cutups', nerdData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/CutUpService/' + id);
        }
    }

}]);
