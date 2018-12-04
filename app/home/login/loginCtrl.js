CmuntyMngr.controller("loginCtrl", function($scope, $location, user) {
    
    $scope.email = "mk@mk.com";
    $scope.pwd = "1234";

    $scope.invalidLogin = false;

    $scope.login = function() {
        $scope.invalidLogin = false;

        user.login($scope.email, $scope.pwd).then(function() {
            // success login
            $location.path("/dashboard")
        }, function(error) {
            // failed login
            $scope.invalidLogin = true;
        })
    }
});