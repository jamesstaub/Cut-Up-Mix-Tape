angular.module('cutupApp').controller('GeniusApiController', function($scope, GeniusApi) {

  console.log("calls geniusapi the controller")

  $scope.queryGenius = function(query){
    console.log("calls the query");
    GeniusApi.get(query).success(function(response) {
      // lists for the api lyrics and the
      $scope.lists = [
      {
        description: "Drag lyrics here",
        label: "CutUp",
        type: "CutUpSegment",
        allowedTypes: ['songResult'],
        songs: ['']
      },
      {
        description: "type some thoughts",
        type: 'songResult',
        label: "songResult",
        songs: response
      }]

    });
  }


  $scope.addToComposition = function(stanzaIndex, list){
    // first test to move the stanza from one model to the other

    // then add argument to allow stanzas within the cutup to be moved around
        // ie reinvoke list.songs.splice($index,1) only if its the cutup list

    console.log(stanzaIndex + ' ' + list);

  }


  $scope.canDropHere = function(selectedType, destinationType ){
    console.log("selectedType: " +selectedType);
    console.log("destinationType: " +destinationType);

    return selectedType !== destinationType;

  }

  //   // Model to JSON for demo purpose
  // $scope.$watch('lists', function(lists) {
  //   $scope.modelAsJson = angular.toJson(lists, true);
  // }, true);

});


// TO DO, fix this dependency injection
// GeniusApiController.$inject = ['GeniusApi'];

