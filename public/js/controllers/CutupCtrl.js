angular.module('cutupApp').controller('CutUpController', function($scope, CutUp) {

  console.log("calls cutup ctrller");

  $scope.getCutups = function(){
    CutUp.get().success(function(response){
      $scope.cutups = response;
    })
  }

  $scope.saveCutup = function(cutup){
    CutUp.post(cutup).success(function(response){
      console.log(response)
      $location.path( "/cutups/" + response._id );
    })
  }


});
