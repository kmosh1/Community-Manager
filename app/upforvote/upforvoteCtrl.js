CmuntyMngr.controller("upforvoteCtrl", function ($scope, upforvoteSrv, userSrv) {


    // handle accordion animation

    $('.panel-collapse').on('show.bs.collapse', function () {
        $(this).siblings('.panel-heading').addClass('active');
    });

    $('.panel-collapse').on('hide.bs.collapse', function () {
        $(this).siblings('.panel-heading').removeClass('active');
    });

    // load votes from json

    upforvoteSrv.getUpForVotes().then(function (upforvotes) {
        $scope.upforvotes = upforvotes;
    }, function (error) {

    })

    $scope.filterUpforvotes = function (upforvote) {
        var currentUser = userSrv.getActiveUser();
        var tmpUser = userSrv.getUser(upforvote.createdBy);
        return currentUser.address == tmpUser.address ? true : false;
    }

    $scope.castVote = function (vote) {
        if (vote) {
            console.log(vote);
        }
    }
});