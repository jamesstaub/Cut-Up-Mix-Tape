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
    setTitle: function(title){
      $scope.model.containers[0].title = title;
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

    select: function(lyricObject){
      // prevent the editor from persisting when selecting a new lyric
      if(lyricObject !== $scope.model.selected){
        this.trimEditor = false;
        $scope.model.selected = lyricObject;
      }

    },
    clearAll: function(){
      $scope.model.containers[0] = {
        type: 'cutup',
        query: this.value,
        lyrics: ''
      }
    },
    trimInit: function(lyric){
      $scope.isSelected = false;
      this.trimEditor = true;
      $scope.lyricToTrim = lyric;
    },

    trim: function(){

    },
    trimClear: function(){
      this.trimEditor = false;
    },
    trimSave: function(selectedText){
      // lyricObject.lyric = $scope.lyricToTrim;
      this.trimClear();
    },

    splitLyricArray: '',
    trimEditor: false,
  }

  $scope.showSelectedText = function() {
    $scope.selectedText =  $scope.getSelectionText();
  };

  $scope.getSelectionText = function() {
     $scope.isSelected = false;
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }

    if(text.length > 0 ){
      $scope.isSelected = true;
    }
    return text;
  };

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

