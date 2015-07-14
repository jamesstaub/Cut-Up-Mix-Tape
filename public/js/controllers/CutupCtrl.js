angular.module('cutupApp').controller('CutUpController', function($scope, CutUp) {

  console.log("calls cutup ctrller");

  $scope.getCutups = function(){
    CutUp.get().success(function(response){
      $scope.cutups = response;
    })
  }


});
