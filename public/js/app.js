var app = angular.module('cutupApp', ['ngRoute', 'appRoutes']);

//searchForm Directive
app.directive('query', function() {
  return {
    restrict: 'EA',
    template: '<input type="text" name="q" ng-model="query" ng-change="queryGenius(query)" placeholder="enter a message">',
    controller: 'GeniusApiController'

  };
  // controller getting called twice
});
