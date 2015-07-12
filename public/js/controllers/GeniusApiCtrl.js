angular.module('cutupApp').controller('GeniusApiController', function($scope, GeniusApi) {

  console.log("calls geniusapi the controller")

  $scope.queryGenius = function(query){
    console.log("calls the query");
    GeniusApi.get(query).success(function(response) {
      // model for the api lyrics and the
      $scope.model = [
        {
          title: 'search results',
          songs: response,
          type: 'results'
        },
        {
          title: 'your cutup title',
          songs: [[
            {
              artist: 'Mac Miller',
              artist_img: 'http://images.rapgenius.com/1d1887f20ed9a44c0f0842f4e0d508a7.300x300x1.jpg',
              lyric: 'Oh well, it\'ll be OK...'
            },
            {
              title: 'OK',
              artist: 'Mac Miller',
              artist_img: 'http://images.rapgenius.com/1d1887f20ed9a44c0f0842f4e0d508a7.300x300x1.jpg',
              lyric: 'How many hoes want to clean Mac\'s beard?'
            }
          ]],
          type: 'cutup'
        }

      ];
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

