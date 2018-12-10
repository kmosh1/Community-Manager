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
           $scope.invalidLogin = true;
        })
    }


    $scope.addUser = function (modalNum) {

        if (modalNum === 2) {
            CurrentUser = userSrv.getActiveUser();
            var fullAddress = CurrentUser.address;
            console.log(fullAddress);
            $scope.isCommittee = ($scope.isCommittee === "No")? false: true;
        } else {
            var fullAddress = $scope.addrText + " " + $scope.buildingNum + " ," + $scope.cityText;
            console.log(fullAddress);
            $scope.isCommittee = true;
        }
        if (formValidation(fullAddress, modalNum)) {
            userSrv.addUser($scope.fname, $scope.lname, $scope.email, $scope.pwd, fullAddress,
                $scope.isCommittee, $scope.apprtmntgNum, $scope.myImage ? $scope.myImage.src : "https://www.mie.ie/images/user-default.png").then(function (user) {
                if (modalNum===1) {
                alert("Registration successful!! congratulations! <br> Press OK to get into Community Manager");
                    document.getElementById("RegForm").reset();
                    $('#sem-reg').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    $scope.invalidLogin = false;
                    $location.path("/tenants");
                } else {
                    alert("Tenant was added successfully");
                    document.getElementById("tnntForm").reset();
                    $('#new-tnnt').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                }

                }, function (error) {
                    // failed register
                    alert(error);
                    if (modalNum===1) {
                        $scope.invalidLogin = true;
                    }
                })
        }
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


    function formValidation(fullAddress, modalNum) {

        if (!$scope.fname || !$scope.lname || !$scope.email | !$scope.pwd
            || !$scope.apprtmntgNum || !fullAddress || !$scope.isCommittee) {
            // || !$scope.addrText || !$scope.buildingNum || !$scope.cityText || !$scope.apprtmntgNum) {
            alert("first/last name, email, password, full address/appartment are mandatory fields");
            return false;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.email)) {
            alert("Invalid Email...!!!!!!");
            return false;
        }

        if ($scope.pwd1 != $scope.pwd2) {
            alert("the password and password confirmation do not match");
            return false;
        }

        for (var i in $scope.users) {
            if (modalNum === 1) {
                if (fullAddress === $scope.users[i].address) {
                    alert("this community address provided is already registered. Please contact your community committee for registration to Community Manager");
                    return false;
                };
            }
            if ($scope.email === $scope.users[i].email) {
                alert("the email provided is already registered. Please check your email for Community Manager login details");
                return false;
            };
        };
        return true;
    }

});