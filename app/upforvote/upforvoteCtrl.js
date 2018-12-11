CmuntyMngr.controller("upforvoteCtrl", function ($scope, upforvoteSrv) {

    $scope.toggle = false;
    upforvoteSrv.getUpForVotes().then(function (upForVotes) {
        $scope.upForVotes = upForVotes;
    }, function (error) {

    })

});