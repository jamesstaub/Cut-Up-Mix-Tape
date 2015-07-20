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
      $scope.model.containers[1] = {
          type: 'loading',
          query: '',
          lyrics: ''
        }

      GeniusApi.get(this.value).success(function(data) {
        $scope.model.containers[1] = {
          type: 'results',
          query: this.value,
          lyrics: data,
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

// for editing and deleting individual lyric segments
  $scope.editComposition = {
    clearAll: function(){
      $scope.model.containers[0] = {
        type: 'cutup',
        query: this.value,
        lyrics: ''
      }
    },
    trimInit: function(){
      this.trimEditor = true;
      this.splitLyricArray = $scope.model.selected.lyric.split(' ');
      // set available range
      $scope.minLen = 0;
      $scope.maxLen = this.splitLyricArray.length;

      // default the user's values to the available range
      $scope.userMin = $scope.minLen;
      $scope.userMax = $scope.maxLen;


    },

    trim: function(min, max){

      this.hightlight(min, max);

    },

    hightlight: function(min, max){

      if(this.splitLyricArray){
        $scope.trimString =  this.splitLyricArray.slice(min, max).join(" ");
        $scope.trimStringBefore =  this.splitLyricArray.slice(0, min).join(" ");
        $scope.trimStringAfter =  this.splitLyricArray.slice(max).join(" ");
      }
    },
    splitLyricArray: '',
    trimEditor: false,

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

