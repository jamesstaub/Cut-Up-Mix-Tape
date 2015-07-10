angular.module('cutupApp').controller('GeniusApiController', function($scope, GeniusApi) {

  function queryGeniusApi(){
    var apiPromise = GeniusApi.get($scope.queryStr)
    console.log("Promise : " + apiPromise);
    apiPromise.success(function(response){
      console.log(response);
      $scope.apiResults = response;
    });
  }
  queryGeniusApi();

  // after each change to $scope.queryStr invoke getResults
  // attach input field to ng-model of rqueryStr



});

// TO DO, fix this dependency injection
// GeniusApiController.$inject = ['GeniusApi'];
