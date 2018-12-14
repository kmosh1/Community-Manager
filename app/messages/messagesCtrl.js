CmuntyMngr.controller("messagesCtrl", function ($scope, $location, messages, userSrv) {

    $scope.editedMessage = {};

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

    $scope.editMsg = function (message) {
        $scope.editedMessage = message;
    }

    $scope.editMessage = function () {
        alert("Message edited and saved succcessfully");
        document.getElementById("editMsgForm").reset();
        // $('#edit-msg').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $scope.editedMessage = {};
 
    }
   

    $scope.addComment = function (details, messageId) {
        messages.addComment(details, messageId);
        $(':input[name="comment"]').val(null);
    }

    $scope.delMessage = function (message) {
        if (confirm("Are you sure you want to delete this message? ")) {
            messages.deleteMessage(message).then(function (success) {
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

    $scope.getUserName = function (userId) {
        var tmpUser = userSrv.getUser(userId);
        return tmpUser.fname + " " + tmpUser.lname;
    }

    $scope.filterMessages = function (message) {
        var currentUser = userSrv.getActiveUser();
        var tmpUser = userSrv.getUser(message.userId);
        return currentUser.address == tmpUser.address ? true : false;
    }

    $scope.messagesURL = function () {
        if ($location.path() === "/messages") {
            return true;
        } else {
            return false;
        }
    }

    $scope.msgOwner = function (message) {
        var currentUser = userSrv.getActiveUser();
        if (currentUser.id === message.userId || currentUser.isCommittee === "Yes") {
            return true;
        } else {
            return false;
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
})