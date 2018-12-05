CmuntyMngr.controller("loginCtrl", function ($scope, $location, userSrv) {

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

    $scope.register = function () {
        $scope.invalidLogin = false;
        for (var i in $scope.users) {
            if ($scope.address === $scope.users[i].address) {
                alert("this community address is already registered. Please contact your community committee for registration to Community Manager");
                return;
            }
        }
    


        // userSrv.login($scope.email, $scope.pwd).then(function (user) {
        //     // success login  sem-login
        //     document.getElementById("loginForm").reset();
        //     $('#sem-login').modal('hide');
        //     $('body').removeClass('modal-open');
        //     $('.modal-backdrop').remove();
        //     $location.path("/dashboard");
        // }, function (error) {
        //     // failed login
        //     alert(error);
        //     document.getElementById("loginForm").reset();
        //     $scope.invalidLogin = true;
        // })
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