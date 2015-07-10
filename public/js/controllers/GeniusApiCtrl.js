angular.module('cutupApp').controller('GeniusApiController', function($scope, GeniusApi) {

  console.log("calls geniusapi the controller")

  $scope.queryGenius = function(query){
    console.log("calls the query");
    GeniusApi.get(query).success(function(response){
      $scope.apiResults = response;
    });
  }

  // $scopequeryGenius();

  // after each change to $scope.queryStr invoke queryGenius
  // attach input field to ng-model of rqueryStr

});

// TO DO, fix this dependency injection
// GeniusApiController.$inject = ['GeniusApi'];
