CmuntyMngr.controller("messagesCtrl", function($scope, messages, $location) {

    // Checking if the user is currently logged in,
    // if not redirecting to the home page
    // if (!loginSrv.isLoggedIn()) {
    //     $location.path("/");
    //     return;
    // }

    messages.getMessages().then(function (messages) {
        $scope.messages = messages;
    }, function(error) {
        
    })
})