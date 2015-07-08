// public/js/controllers/MainCtrl.js

angular.module('MainCtrl', []).controller('MainController', function($scope, CutUp) {

    var getResults = function(){
      CutUp.get();
    }
    getResults();

    $scope.test = 'this is the front page test';
    $scope.results = CutUp.cutup;




});

// MainController.$inject = ['Main'];
