angular.module('cutupApp').controller('GeniusApiController', ['$scope', '$location', '$timeout', 'GeniusApi', function($scope, $location, $timeout, GeniusApi) {


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
// timeout to slow down the rate of requests from input field
  var _timeout;
  $scope.inputMessage = {
    set: function(msg){
      this.value = msg;
    },
    get: function(){
      return this.value;
    },
    queryGenius: function(){
      console.log('query' + this.value)
      GeniusApi.get(this.value).success(function(data) {
        console.log(data);
        $scope.model.containers[1] = {
          type: 'results',
          query: this.value,
          lyrics: data
        }
      });
    },
    timeOut: function(){
      var self = this;
      if(_timeout){ //if there is already a timeout in process cancel it
        $timeout.cancel(_timeout);
      }
      _timeout = $timeout(function(){
      self.queryGenius(this.value)
        _timeout = null;
      },300);
    },
    value: ''
  }

  $scope.clearComposition = function(){
  console.log("clear you fuck")
   $scope.model.containers[0] = {
        type: 'results',
        query: this.value,
        lyrics: ''
      }
  }

  $scope.saveCutup = function(cutup){
    GeniusApi.post(cutup).success(function(response){
      console.log("successfully saved");
      console.log(response._id)
      $location.path( "/cutups/" + response._id );
    }).error(function(err) {
      console.error(err);
    });
  }

}]);

