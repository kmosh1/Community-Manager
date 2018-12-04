CmuntyMngr.controller("messagesCtrl", function ($scope, messages, $location, user) {

    // Checking if the user is currently logged in,
    // if not redirecting to the home page
    // if (!loginSrv.isLoggedIn()) {
    //     $location.path("/");
    //     return;
    // }


    messages.getMessages().then(function (messages) {
        $scope.messages = messages;
    }, function (error) {

    })

    messages.getComments().then(function (comments) {
        $scope.comments = comments;
    }, function (error) {

    })

     $scope.addMessage = function (subject, details, priority) {
        messages.createMessage(subject, details, priority);
    }

    $scope.getUserName = function(userId) {
       var tmpUser = user.getUser(userId);
       return tmpUser.fname + " " + tmpUser.lname;
    }

    $scope.filterMessages = function (message) {
        var currentUser = user.getActiveUser();
        var tmpUser = user.getUser(message.userId);
       return currentUser.adress == tmpUser.adress ? true : false;
    }

})