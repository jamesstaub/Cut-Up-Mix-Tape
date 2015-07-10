// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'GeniusApiController'
        })
        //
        // .when('/cutups', {
        //     templateUrl: 'views/cutup.html',
        //     controller: 'GeniusApiController'
        // });

    $locationProvider.html5Mode(true);

}]);
