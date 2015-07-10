var app = angular.module('cutupApp', ['ngRoute', 'appRoutes']);

//searchForm Directive
app.directive('query', function() {
  return {
    restrict: 'EA',
    template: '<input type="text" name="s" ng-model="filter.s" ng-change="search()" placeholder="Search Projects">',
    controller: ['$scope', '$http', function ( $scope, $http ) {
      $scope.filter = {
        s: ''
      };
      $scope.search = function() {
        $http.get('wp-json/posts/?filter[category_name]=portfolio&filter[s]=' + $scope.filter.s).success(function(res){
          $scope.posts = res;
        });
      };
    }]
  };
});
