angular.module('cutupApp').factory('Auth', ['$http', function($http){

var currentUser = false;

var auth = {
    setUser : function(account){
        currentUser = account;
    },
    isLoggedIn : function(){
        return(currentUser)? currentUser : false;
    },
    register :  function(account){
      return $http.post('/auth/register', account)
    },
    login :  function(account){
      console.log("calls login method " + account)
      return $http.post('/auth/login', account)
    },
    logout :  function(account){
      currentUser = false;

      return $http.get('/auth/logout')
    }
  }

  return auth;
}]);
