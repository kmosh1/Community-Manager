CmuntyMngr.controller("upforvoteCtrl", function ($scope, $location, upforvoteSrv, userSrv) {

    $scope.hasVoted = [];
    $scope.passedDueDate = [];
    $scope.dueDate2Days = [];
    $scope.editedDueDate = {};

    // $scope.newUpforvote = new upforvote();
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

    $scope.castVote = function (upforvote, vote) {
        if (vote) {
            var currentUser = userSrv.getActiveUser();
            console.log(JSON.stringify(upforvote));
            console.log(JSON.stringify(currentUser));
            console.log(JSON.stringify(vote));
            var userVotedString = "apartment" + currentUser.appartment;

            upforvoteSrv.updateVote(userVotedString, upforvote, vote, $scope.checkVoted(upforvote)[1] + 1).then(function (success) {
                alert(success);

            }, function (error) {
                // failed updating vote
                alert(error);
            })
        }
    }

    $scope.checkVoted = function (upforvote) {
        var currentUser = userSrv.getActiveUser();
        var userVotedString = "apartment" + currentUser.appartment;
        var voteIndex = upforvote.voted.indexOf(userVotedString);
        if (voteIndex != -1) {
            $scope.hasVoted[upforvote.id] = true;
            return [upforvote.votes[voteIndex], voteIndex];
        } else {
            $scope.hasVoted[upforvote.id] = false;
            return [false, voteIndex];
        }
    }

    $scope.checkDueDate = function (upforvote) {
        var upForVoteDate = Date.parse(upforvote.dueDate);
        var today = Date.parse(new Date());
        var in2days = new Date();
        in2days.setDate(in2days.getDate() + 2);
        in2days = Date.parse(in2days);
        // DueDate more than 2 days
        if (upForVoteDate > in2days) {
            $scope.dueDate2Days[upforvote.id] = false;
            $scope.passedDueDate[upforvote.id] = false;
            return [false, false];
            // DueDate passed
        } else if (upForVoteDate < today) {
            $scope.dueDate2Days[upforvote.id] = false;
            $scope.passedDueDate[upforvote.id] = true;
            return [false, true];
            // DueDate within 2 days
        } else {
            $scope.dueDate2Days[upforvote.id] = true;
            $scope.passedDueDate[upforvote.id] = false;
            return [true, false];
        }
    }


    $scope.addUpforvote = function () {
        //validate new vote data
        if (!$scope.title || !$scope.details || !$scope.dueDate || !$scope.voteOptions) {
            alert("All form fields are mandatory!!");
        }
        if ($scope.dueDate <= new Date()) {
            alert("DueDate can't be in the past");
        }

        var currentUser = userSrv.getActiveUser();
        upforvoteSrv.addUpForVote(currentUser.id, $scope.title, $scope.details, $scope.voteOptions, $scope.dueDate).then(function (upforvote) {
            alert("UpForVote was added successfully");
            document.getElementById("newVoteForm").reset();
            $('#new-vote').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();

        }, function (error) {
            // failed addding upForVote
            alert(error);
        })
    }

    $scope.editDueDate = function (upforvote) {
        console.log(JSON.stringify(upforvote));
        $scope.editedDueDate = upforvote;
    }

    $scope.editUFVDueDate = function () {
        console.log($scope.editedDueDate);

        // alert("Tenant edited and saved succcessfully");
        // document.getElementById("editTnntForm").reset();
        // $('#edit-tnnt').modal('hide');
        // $('body').removeClass('modal-open');
        // $('.modal-backdrop').remove();
        // $scope.editedUser = {};

    }

    $scope.upforvoteURL = function () {
        if ($location.path() === "/upforvote") {
            return true;
        } else {
            return false;
        }
    }

    $scope.isUserCommittee = function () {
        return userSrv.isCommittee();
    }

});