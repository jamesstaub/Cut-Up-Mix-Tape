angular.module('cutupApp').controller('AuthController', [ '$scope', '$location',  'Auth', function ($scope, $location, Auth) {
  console.log("running auth ctrl")
  // $scope.isLoggedIn = function() {
  //     return Auth.isLoggedIn();
  // };

  $scope.registerUser = function() {
    console.log("called register User with " + $scope.account);
    Auth.register($scope.account).success(function(response){
      // $scope.auth = response;
    })
  };

  $scope.loginUser = function() {
    Auth.login($scope.account).success(function(response){
      Auth.setUser(response);
      $location.path('/')
      // $scope.currentUser = {set: Auth.isLoggedIn()};

    })
  };

  $scope.logoutUser = function() {
    Auth.logout().success(function(response){
      Auth.setUser(false);
      // $scope.currentUser = {set: Auth.isLoggedIn()};
    })
  };



  // $scope.$watch('Auth.isLoggedIn()', function(newVal) {
  //   console.log("watching ")
  //   console.log(newVal);
  //     $scope.currentUser = newVal;
  // });
  $scope.auth = Auth;
  // $scope.currentUser =  Auth.isLoggedIn();



    // Ask to the server, do your job and THEN set the user
    // Auth.setUser(user); //Update the state of the user in the app

}]);
