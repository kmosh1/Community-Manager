CmuntyMngr.controller("upforvoteCtrl", function ($scope, $location, upforvoteSrv, userSrv) {

    $scope.activeUser = userSrv.getActiveUser();
    $scope.hasVoted = {};
    $scope.passedDueDate = {};
    $scope.dueDate2Days = {};
    $scope.editedDueDate = {};

    // $scope.dueDate = "";

    $(function () {
        $('#datetimepicker1').datetimepicker({
            //  inline: true,
            //  sideBySide: true,
            date: new Date(),
            format: 'DD/MM/YYYY HH:mm'

        });
    });

    $(function () {
        $('#datetimepicker0').datetimepicker({
            //  inline: true,
            //  sideBySide: true,
            date: new Date(),
            format: 'DD/MM/YYYY HH:mm'

        });
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
            console.log(JSON.stringify($scope.hasVoted));
            return [upforvote.votes[voteIndex], voteIndex];
        } else {
            $scope.hasVoted[upforvote.id] = false;
            console.log(JSON.stringify($scope.hasVoted));
            return [false, voteIndex];
        }
    }

    $scope.pendingVoteCount = function () {
        var count = 0;
            for (var i in $scope.hasVoted) {
                console.log("pending " + JSON.stringify($scope.hasVoted[i]));
                if (!$scope.hasVoted[i] && !$scope.passedDueDate[i]) {
                    count++;
                }
            }
        return count;
    }

    $scope.checkDueDate = function (upforvote) {
        moment.locale('he');
        var today = moment();
        var in2days = moment().add(2, 'days');
        var upForVoteDate = moment(upforvote.dueDate, 'L LT');
        // DueDate more than 2 days
        if (moment(upForVoteDate).isAfter(in2days)) {
            $scope.dueDate2Days[upforvote.id] = false;
            $scope.passedDueDate[upforvote.id] = false;
            return [false, false];
            // DueDate passed
        } else if (moment(upForVoteDate).isBefore(today)) {
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
        console.log(JSON.stringify($('#datetimepicker0').datetimepicker('date')));
        // $scope.dueDate = $('#datetimepicker0').datetimepicker('date');
        // $scope.dueDate = moment($scope.dueDate).format('DD/MM/YYYY HH:mm');
        $scope.dueDate = moment($('#datetimepicker0').datetimepicker('date').format('L LT'));
        $scope.dueDate = moment($scope.dueDate).format('L LT');
        if (!$scope.title || !$scope.details || !$scope.dueDate || !$scope.voteOptions) {
            alert("All form fields are mandatory!!");
        } else if ($scope.dueDate <= new Date()) {
            alert("DueDate can't be in the past");
        } else {

            var currentUser = userSrv.getActiveUser();
            upforvoteSrv.addUpForVote(currentUser.id, $scope.title, $scope.details, $scope.voteOptions, $scope.dueDate).then(function (upforvote) {
                alert("UpForVote was added successfully");
                document.getElementById("newVoteForm").reset();
                // $('#new-vote').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();

            }, function (error) {
                // failed addding upForVote
                alert(error);
            })
        }
    }

    $scope.editDueDate = function (upforvote) {
        console.log(JSON.stringify(upforvote));
        $scope.editedDueDate = upforvote;
    }

    $scope.newUFVDueDate = function () {
        moment.locale('he');
        $scope.newDueDate = moment($('#datetimepicker1').datetimepicker('date').format('L LT'));
        $scope.newDueDate = moment($scope.newDueDate).format('L LT');
        $scope.editedDueDate.dueDate = $scope.newDueDate;
        $scope.checkDueDate ($scope.editedDueDate);
        console.log("newUFVdate" + JSON.stringify($scope.editedDueDate));
        $scope.editedMessage = {};

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
        var committee = userSrv.isCommittee();
        $('#editDueDate').prop('disabled', !committee)
        return committee;
    }

});