angular.module('cutupApp').controller('GeniusApiController', ['$scope', '$location', 'GeniusApi', function($scope, $location, GeniusApi) {



  $scope.parseMessage = function(len){
    var messageSegments = GeniusApi.parseString(len, $scope.messageInput );
    messageSegments.forEach(function(seg){
      // seg
    })
    console.log(messageSegments);
  }

  $scope.queryGenius = function(query){
    console.log("calls the query " + query );
    GeniusApi.get(query).success(function(response) {
      $scope.model.containers[0].lyrics = response;
      console.log($scope.model.containers[0].lyrics)
      // model for the api lyrics and the
    });
  }
  $scope.model = {
      containers: [
        {
          type: 'results',
          title: 'search results',
          lyrics: $scope.queryResponse
        },
        {
          type: 'cutup',
          title: 'enter a title',
          lyrics: []
        }
      ],
      selected: null
    }

  $scope.saveCutup = function(cutup){
    console.log('call the save in controller')
    console.log(cutup)
    GeniusApi.post(cutup).success(function(response){
      console.log(response)
      $location.path( "/cutups/" + response._id );
    })
  }


  //   // Model to JSON for demo purpose
  // $scope.$watch('lists', function(lists) {
  //   $scope.modelAsJson = angular.toJson(lists, true);
  // }, true);

}]);


// TO DO, fix this dependency injection
// GeniusApiControllerller.$inject = ['GeniusApi'];

