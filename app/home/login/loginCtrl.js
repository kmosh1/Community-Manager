CmuntyMngr.controller("loginCtrl", function ($scope, $location, user) {

    $scope.email = "mk@mk.com";
    $scope.pwd = "1234";

    $scope.invalidLogin = false;

    $scope.login = function () {
        $scope.invalidLogin = false;

        user.login($scope.email, $scope.pwd).then(function () {
            // success login  sem-login
            $('#sem-login').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            document.getElementById("loginForm").reset();
            $location.path("/dashboard");
        }, function (error) {
            // failed login
            alert(error);
            document.getElementById("loginForm").reset();
            $scope.invalidLogin = true;
        })
    }

    user.getUsers().then(function (users) {
        $scope.users = users;
    }, function (error) {

    })
});