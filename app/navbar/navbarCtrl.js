CmuntyMngr.controller('navbarCtrl', function($scope, user) {
    
    $scope.isUserCommittee = function () {
        return user.isCommittee();
    }

    function initNavbar () {
        var currentUser = user.getActiveUser();
        $scope.isUserCommittee = currentUser.isCommittee;
        $scope.userName = currentUser.fname + " " + currentUser.lname;
    }

    initNavbar ();
})