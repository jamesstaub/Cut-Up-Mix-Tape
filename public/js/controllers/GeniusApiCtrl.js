angular.module('cutupApp').controller('GeniusApiController', function($scope, GeniusApi) {

  console.log("calls geniusapi the controller")

  $scope.queryGenius = function(query){
    console.log("calls the query");
    GeniusApi.get(query).success(function(response) {
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

  $scope.moveStanza = function(stanzaIndex, item){
    // move the stanza from one model to the other
    console.log(stanzaIndex + ' ' + item);

  }


  $scope.canDropHere = function(selectedType, destinationType ){
    return true;
    // return selectedType !== destinationType;

  }

  $scope.dropItem = function(item){
    return item;
  }

  //   // Model to JSON for demo purpose
  // $scope.$watch('lists', function(lists) {
  //   $scope.modelAsJson = angular.toJson(lists, true);
  // }, true);

});


// TO DO, fix this dependency injection
// GeniusApiController.$inject = ['GeniusApi'];

