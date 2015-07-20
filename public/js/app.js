var app = angular.module('cutupApp', ['ngRoute', 'appRoutes', 'dndLists', 'ui-rangeSlider']);


app.config(['$httpProvider',
   function($httpProvider) {
     $httpProvider.defaults.withCredentials = true;
   }
 ])
//search form Directive to query api
// app.directive('query', function() {
//   return {
//     restrict: 'EA',
//     template: '<input type="text" name="q" ng-model="query" ng-change="queryGenius(query)" placeholder="enter a message">',
//     controller: 'GeniusApiController'
//   };
//   // controller getting called twice
// });

// // interface for register, login, logout
// app.directive('usernav', function() {
//   return {
//     restrict: 'EA',
//     templateUrl: 'views/userNav.html',
//     controller: 'AuthController',
//     transclude: true,
//   };
  // controller getting called twice
// });
