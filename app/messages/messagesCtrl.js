CmuntyMngr.controller("messagesCtrl", function ($scope, messages, $location) {

    // Checking if the user is currently logged in,
    // if not redirecting to the home page
    // if (!loginSrv.isLoggedIn()) {
    //     $location.path("/");
    //     return;
    // }

    $scope.states = {};
    
    $scope.openDetails = function () {
        $scope.details = true;
    }


    messages.getMessages().then(function (messages) {
        $scope.messages = messages;
    }, function (error) {

    })

    messages.getComments().then(function (comments) {
        $scope.comments = comments;
    }, function (error) {

    })
})