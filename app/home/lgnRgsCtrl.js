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


    $scope.register = function () {

        if (!$scope.fname|| !$scope.lname || !$scope.email | !$scope.pwd
        || !$scope.addrText || !$scope.buildingNum || !$scope.cityText || !$scope.apprtmntgNum) {
            alert("first/last name, email, password, full address are mandatory fields");
            return;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.email)) {
            alert("Invalid Email...!!!!!!");
            return;
        }

        if ($scope.pwd1 != $scope.pwd2) {
            alert("the password and password confirmation do not match");
            return;
        }

        var fullAddress = $scope.addrText + " " + $scope.buildingNum + " ," + $scope.cityText;
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
        }

        userSrv.addUser($scope.fname, $scope.lname, $scope.email, $scope.pwd, 1, fullAddress,
            $scope.apprtmntgNum, $scope.myImage ? $scope.myImage.src: "https://www.mie.ie/images/user-default.png").then(function (user) {
                alert("Registration successful!! congratulations! <br> Press OK to get into Community Manager");
                document.getElementById("loginForm").reset();
                $('#sem-reg').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                $scope.invalidLogin = false;
                $location.path("/tenants");
            }, function (error) {
                // failed register
                alert(error);
                document.getElementById("loginForm").reset();
                $scope.invalidLogin = true;
            })
    }



    // INIT USERS //
    userSrv.getUsers().then(function (users) {
        $scope.users = users;
    }, function (error) {

    })

    $scope.filterUsers = function (user) {
        CurrentUser = userSrv.getActiveUser();
        return CurrentUser.address == user.address ? true : false;
    }

});