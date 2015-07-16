angular.module('cutupApp').controller('GeniusApiController', ['$scope', '$location', 'GeniusApi', function($scope, $location, GeniusApi) {


  // the 0th object in the containers array is the cutup that the user creates, all subsequent containers store results to particular requests
  $scope.model = {
      containers: [
        {
          type: 'cutup',
          title: 'enter a title',
          lyrics: []
        }
      ],
      selected: null
    }

  $scope.parseMessage = function(len){
    var messageSegments = GeniusApi.parseString(len, $scope.messageInput );
// don't make blank requests dummy
    if(messageSegments.length){
      // var cutup = $scope.model.containers.shift();
      // $scope.model.containers = [cutup];
      messageSegments.forEach(function(seg){
        GeniusApi.get(seg)
          .success(function(data){
            $scope.model.containers.push({
              type: 'results',
              title: 'search results',
              query: seg,
              lyrics: data
            });
          })
          .error(function(data, status) {
            console.error('error', status, data);
          });
      });
    }
  }


  $scope.queryGenius = function(query){
    console.log("calls the query " + query );
    GeniusApi.get(query).success(function(response) {
      $scope.model.containers[1].lyrics = response;
      console.log($scope.model.containers[1].lyrics)
      // model for the api lyrics and the
    });
  }

  $scope.saveCutup = function(cutup){
    console.log('call the save in controller')
    console.log(cutup)
    GeniusApi.post(cutup).success(function(response){
      console.log(response)
      $location.path( "/cutups/" + response._id );
    })
  }

}]);

