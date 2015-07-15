angular.module('cutupApp').controller('GeniusApiController', ['$scope', '$location', 'GeniusApi', function($scope, $location, GeniusApi) {

  console.log("calls geniusapi the controller");

  $scope.queryGenius = function(query){
    console.log("calls the query");
    GeniusApi.get(query).success(function(response) {
      console.log(response)
      // model for the api lyrics and the
      $scope.model = {
        containers: [
          {
            type: 'results',
            title: 'search results',
            lyrics: response
          },
          {
            type: 'cutup',
            title: 'your cutup title',
            lyrics: [
              {
                artist: 'Mac Miller',
                lyric: 'Oh well, it\'ll be OK...'
              },
              {
                title: 'OK',
                artist: 'Mac Miller',
                lyric: 'How many hoes want to clean Mac\'s beard?'
              }
            ]
          }
        ],
        selected: null
      }
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


  //   // Model to JSON for demo purpose
  // $scope.$watch('lists', function(lists) {
  //   $scope.modelAsJson = angular.toJson(lists, true);
  // }, true);

}]);


// TO DO, fix this dependency injection
// GeniusApiControllerller.$inject = ['GeniusApi'];

