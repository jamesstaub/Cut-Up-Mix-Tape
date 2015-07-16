// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        // home page
        .when('/', {
            templateUrl: 'views/inputmessage.html',
            controller: 'GeniusApiController'
        })
        .when('/cutups', {
            templateUrl: 'views/cutup.html',
            controller: 'CutUpController'
        })
        .when('/cutups/:id', {
            templateUrl: 'views/single.html',
            controller: 'CutUpController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'AuthController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'AuthController'
        })

    $locationProvider.html5Mode(true);

}]);
