CmuntyMngr.controller("messagesCtrl", function ($scope, messages, userSrv) {

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

    $scope.addComment = function (details, messageId) {
        messages.addComment(details, messageId);
        $(':input[name="comment"]').val(null);
    }

    $scope.getUserName = function (userId) {
        var tmpUser = userSrv.getUser(userId);
        return tmpUser.fname + " " + tmpUser.lname;
    }

    $scope.filterMessages = function (message) {
        var currentUser = userSrv.getActiveUser();
        var tmpUser = userSrv.getUser(message.userId);
        return currentUser.address == tmpUser.address ? true : false;
    }

})