CmuntyMngr.controller("messagesCtrl", function ($scope, $location, messages, userSrv) {

    $scope.activeUser = userSrv.getActiveUser();
    $scope.editedMessage = {};
    $scope.msgViewed = {};

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
        $('#edit-msg').on('hidden.bs.modal', function () {
            $(this).find('form')[0].reset();
        })
// document.getElementById("editMsgForm").reset();
         $('#edit-msg').modal('hide');
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

    $scope.notViewed = function (message) {
        var currentUser = userSrv.getActiveUser();
        var viewIndex = message.viewed.indexOf(currentUser.id);
        if (viewIndex != -1) {
            $scope.msgViewed[message.id] = true;
            console.log(JSON.stringify($scope.msgViewed));
            return false;
        } else {
            $scope.msgViewed[message.id] = false;
            console.log(JSON.stringify($scope.msgViewed));
            return true;
        }
    }

    $scope.newMsgsCount = function () {
        var count = 0;
        for (var i in $scope.msgViewed) {
            console.log(i + " :" + JSON.stringify($scope.msgViewed[i]));
            if (!$scope.msgViewed[i]) {
                count++;
            }
        }
        return count;
    }

    $scope.cmntOwner = function (commemt) {
        var currentUser = userSrv.getActiveUser();
        if (currentUser.id === commemt.userId || currentUser.isCommittee === "Yes") {
            return true;
        } else {
            return false;
        }
    }

    $scope.msgViewed = function (message) {
        messages.msgViewed(message).then(function (success) {
            console.log(success);

        }, function (error) {
            // failed updating message viewed
            alert(error);
        })
    }



})