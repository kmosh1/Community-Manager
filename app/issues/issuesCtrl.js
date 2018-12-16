CmuntyMngr.controller("issuesCtrl", function ($scope, $location, issuesSrv, userSrv, messages) {

    $scope.activeUser = userSrv.getActiveUser();

      // load votes from json

      issuesSrv.getIssues().then(function (issues) {
        $scope.issues = issues;
    }, function (error) {

    })

    $scope.filterissues = function (issue) {
        var currentUser = userSrv.getActiveUser();
        var tmpUser = userSrv.getUser(issue.createdBy);
        return currentUser.address == tmpUser.address ? true : false;
    }

    messages.getComments().then(function (comments) {
        $scope.comments = comments;
    }, function (error) {

    })

    $scope.addIssueComment = function (details, issueId) {
        messages.addIssueComment(details, issueId);
        $(':input[name="issueComment"]').val(null);
    }

    $scope.delComment = function (comment) {
        if (confirm("Are you sure you want to delete this comment? ")) {
            messages.deleteComment(comment).then(function (success) {
                alert(success);
            }, function (error) {
                // failed deleting message
                alert(error);
            })
        }
        else {
            return;
        }
    }

    $scope.cmntOwner = function (commemt) {
        var currentUser = userSrv.getActiveUser();
        if (currentUser.id === commemt.userId || currentUser.isCommittee === "Yes") {
            return true;
        } else {
            return false;
        }
    }

    $scope.getUserName = function (userId) {
        var tmpUser = userSrv.getUser(userId);
        return tmpUser.fname + " " + tmpUser.lname;
    }

    $scope.issuesURL = function () {
        if ($location.path() === "/issues") {
            return true;
        } else {
            return false;
        }
    }
});