angular.module('cutupApp').controller('CutUpController', function($scope, $routeParams, CutUp) {

  $scope.getCutupsList = function(){
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

    $scope.getOneCutup = function(){
      console.log($routeParams.id)
      console.log("call the get one function");
      CutUp.getSingle($routeParams.id).success(function(response){
      $scope.cutup = response;

    }).error(function(err){
      console.log("error getting singl cutup");
      console.log(err);
    })
  }


});
