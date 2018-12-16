CmuntyMngr.controller('navbarCtrl', function ($rootScope, $scope, userSrv) {

    $scope.activeUser = userSrv.getActiveUser();
    $scope.isUserCommittee = function () {
        return userSrv.isCommittee();
    }

    if (!$rootScope.crntActvUser || $rootScope.crntActvUser != $scope.activeUser) {
        $rootScope.crntActvUser = userSrv.getActiveUser();
    }
    $scope.userName = $rootScope.crntActvUser.fname + " " + $rootScope.crntActvUser.lname;
    $scope.communityAddr = $rootScope.crntActvUser.address;

})