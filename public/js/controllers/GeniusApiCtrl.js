angular.module('cutupApp').controller('GeniusApiController', ['$scope', '$location', 'GeniusApi', function($scope, $location, GeniusApi) {



  $scope.parseMessage = function(len){
    var messageSegments = GeniusApi.parseString(len, $scope.messageInput );
    messageSegments.forEach(function(seg){
      GeniusApi.get(seg)
        .success(function(data){
          $scope.model.containers.push({
            type: 'results',
            title: 'search results',
            query: seg,
            lyrics: data
          })
          console.log($scope.model.containers);

        })
        .error(function(data, status) {
          console.error('error', status, data);
        });
    });
  }



  $scope.queryGenius = function(query){
    console.log("calls the query " + query );
    GeniusApi.get(query).success(function(response) {
      $scope.model.containers[1].lyrics = response;
      console.log($scope.model.containers[1].lyrics)
      // model for the api lyrics and the
    });
  }

  // the 0th object in the containers array is the cutup that the user creates, all subsequent containers store results to particular requests
  $scope.model = {
      containers: [
        {
          type: 'cutup',
          title: 'enter a title',
          lyrics: []
        },
        {
          type: 'results',
          title: 'search results',
          lyrics: $scope.queryResponse
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

