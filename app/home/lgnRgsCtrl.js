CmuntyMngr.controller("lgnRgsCtrl", function ($scope, $location, userSrv, messages
) {

    // $scope.email = "mk@mk.com";
    // $scope.pwd = "1234";
    $scope.invalidLogin = false;
    $scope.editedUser = {};
    $scope.activeUser = {};
    $scope.login = function () {
        $scope.invalidLogin = false;

        userSrv.login($scope.email, $scope.pwd).then(function (user) {
            // success login  sem-login
            $("#sem-login").modal("hide");
            $('#sem-login').on('hidden.bs.modal', function () {
                $(this).find('form')[0].reset();
            })
            // document.getElementById("loginForm").reset();
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $scope.activeUser = user;
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
        } else {
            var fullAddress = $scope.addrText + " " + $scope.buildingNum + " ," + $scope.cityText;
            console.log(fullAddress);
            $scope.isCommittee = "Yes";
        }
        if (formValidation(fullAddress, modalNum)) {
            userSrv.addUser($scope.fname, $scope.lname, $scope.email, $scope.pwd1, fullAddress, $scope.phone,
                $scope.isCommittee, $scope.apprtmntgNum, $scope.myImage ? $scope.myImage.src : "images/user-default.png").then(function (user) {
                    if (modalNum === 1) {
                        alert("Registration successful!! congratulations! <br> Press OK to get into Community Manager");
                        $('#sem-reg').modal('hide');
                        $('#sem-reg').on('hidden.bs.modal', function () {
                            $(this).find('form')[0].reset();
                        })
                        // document.getElementById("RegForm").reset();
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                        $scope.invalidLogin = false;
                        $location.path("/tenants");
                    } else {
                        alert("Tenant was added successfully");
                        $('#new-tnnt').on('hidden.bs.modal', function () {
                            $(this).find('form')[0].reset();
                        })
                        // document.getElementById("tnntForm").reset();
                        $('#new-tnnt').modal('hide');
                        $('body').removeClass('modal-open');
                        $('.modal-backdrop').remove();
                    }

                }, function (error) {
                    // failed register
                    alert(error);
                    if (modalNum === 1) {
                        $scope.invalidLogin = true;
                    }
                })
        }
    }

    $scope.editTnnt = function (user) {
        // $("#editTnntForm").autofill(user);
        $("#myImage").attr("src", user.image);
        // $('#fname').attr("value","testing");
        $scope.editedUser = user;
    }

    $scope.editUser = function () {
        //alert(JSON.stringify($scope.editedUser));
        // var fname = $scope.fname ? $scope.fname : $scope.editedUser.fname;
        // var lname = $scope.lname ? $scope.lname : $scope.editedUser.lname;
        // $scope.editedEmail = $scope.email ? $scope.email : $scope.editedUser.email;
        $scope.editedPwd1 = $scope.pwd1 ? $scope.pwd1 : $scope.editedUser.pwd;
        $scope.editedPwd2 = $scope.pwd2 ? $scope.pwd2 : $scope.editedUser.pwd;
        // var phone = $scope.phone ? $scope.phone : $scope.editedUser.phone;
        // var isCommittee = $scope.isCommittee ? $scope.isCommittee : $scope.editedUser.isCommittee;
        // var apprtmntgNum = $scope.apprtmntgNum ? $scope.apprtmntgNum : $scope.editedUser.appartment;
        // var image = $scope.myImage ? $scope.myImage.src : $scope.editedUser.image;
        if (formValidation($scope.editedUser.address, 3)) {
            // userSrv.editUser($scope.editedUser, $scope.editedPwd1).then(function (success) {
            //         if (success) {
            alert("Tenant edited and saved succcessfully");
            $('#edit-tnnt').modal('hide');
            $('#edit-tnnt').on('hidden.bs.modal', function () {
                $(this).find('form')[0].reset();
            })
            // document.getElementById("editTnntForm").reset();
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $scope.editedUser = {};
            //         }
            //     })
            $scope.editedUser = {};
        }
    }

    $scope.DeleteUser = function (user) {

        if (confirm("All messages/comments/votes of this tenant will be deleted as well.\nAre you sure you want to delete this tenant? ")) {
            messages.deletedAllMsgsCmntsByUserId(user.id).then(function () {
                userSrv.DeleteUser(user).then(function (success) {
                    alert(success);
                }, function (error) {
                    // failed deleting all messages/comments
                    alert(error);
                })
            }, function (error) {
                alert(error);
            })
        }
        else {
            return;
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

    $scope.logout = function () {
        $location.path("/");
        userSrv.logout();
    }

    $scope.hdieSelfDelete = function () {
        CurrentUser = userSrv.getActiveUser();
        return CurrentUser.id == user.id ? true : false;
    }

    function formValidation(fullAddress, modalNum) {

        if (modalNum === 3) {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.editedUser.email)) {
                alert("Invalid Email...!!!!!!");
                return false;
            }
            if ($scope.editedPwd1 != $scope.editedPwd2) {
                alert("the password and password confirmation do not match");
                return false;
            }

        } else {
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
 
            if (!$scope.fname || !$scope.lname || !$scope.email | !$scope.pwd1
                || !$scope.apprtmntgNum || !fullAddress || !$scope.isCommittee) {
                // || !$scope.addrText || !$scope.buildingNum || !$scope.cityText || !$scope.apprtmntgNum) {
                alert("first/last name, email, password, full address/appartment are mandatory fields");
                return false;
            }

        }
        return true;
    }


});
