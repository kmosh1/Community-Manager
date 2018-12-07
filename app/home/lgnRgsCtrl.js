CmuntyMngr.controller("lgnRgsCtrl", function ($scope, $location, userSrv) {

    $scope.email = "mk@mk.com";
    $scope.pwd = "1234";
    $scope.invalidLogin = false;

    $scope.login = function () {
        $scope.invalidLogin = false;

        userSrv.login($scope.email, $scope.pwd).then(function (user) {
            // success login  sem-login
            document.getElementById("loginForm").reset();
            $('#sem-login').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $location.path("/dashboard");
        }, function (error) {
            // failed login
            alert(error);
            document.getElementById("loginForm").reset();
            $scope.invalidLogin = true;
        })
    }
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
    userSrv.getUsers().then(function (users) {
        $scope.users = users;
    }, function (error) {

    })

    $scope.filterUsers = function (user) {
        CurrentUser = userSrv.getActiveUser();
        return CurrentUser.address == user.address ? true : false;
    }

});