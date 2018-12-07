CmuntyMngr.controller("registerCtrl", function ($scope, $location, userSrv) {

    $scope.fullAddress = $scope.cityText + " ," + $scope.buildingNum + " " + $scope.searchText;
    $scope.register = function () {
        $scope.invalidLogin = false;
        var fullAddress = $scope.searchText + " " + $scope.buildingNum + " ," + $scope.cityText ;
        console.log(fullAddress);
        
        for (var i in $scope.users) {
            if (fullAddress === $scope.users[i].address) {
                alert("this community address provided is already registered. Please contact your community committee for registration to Community Manager");
                return;
            }
            if ($scope.email === $scope.users[i].email) {
                alert("the email provided is already registered. Please check your email for Community Manager login details");
                return;
            }
            if ($scope.pwd1 != $scope.pwd2) {
                alert("the password and password confirmation do not match");
                return;
            }
        }
    }
})