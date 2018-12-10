CmuntyMngr.controller('navbarCtrl', function($scope, userSrv) {
    
    $scope.isUserCommittee = function () {
        return userSrv.isCommittee();
    }

    function initNavbar () {
        var currentUser = userSrv.getActiveUser();
        // $scope.isUserCommittee();
        $scope.userName = currentUser.fname + " " + currentUser.lname;
        $scope.communityAddr = currentUser.address;
    }

    initNavbar ();
})