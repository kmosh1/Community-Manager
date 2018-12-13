CmuntyMngr.controller('navbarCtrl', function ($scope, userSrv) {

    $scope.isUserCommittee = function () {
        return userSrv.isCommittee();
    }

    var currentUser = userSrv.getActiveUser();
    $scope.userName = currentUser.fname + " " + currentUser.lname;
    $scope.communityAddr = currentUser.address;

})