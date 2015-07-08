// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        //
        .when('/cutups', {
            templateUrl: 'views/cutup.html',
            controller: 'CutUpController'
        });

    $locationProvider.html5Mode(true);

}]);
