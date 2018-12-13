CmuntyMngr.controller("issuesCtrl", function ($scope, issuesSrv, userSrv) {

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



});