CmuntyMngr.factory("messages", function ($q, $http, userSrv) {

    var messages = [];
    var comments = [];
    var messageLoaded = false;
    var commentLoaded = false;

    function Message(plainMessage) {
        this.id = plainMessage.id;
        this.subject = plainMessage.subject;
        this.details = plainMessage.details;
        this.createDate = plainMessage.createDate;
        this.priority = plainMessage.priority;
        this.userId = plainMessage.userId;
        this.viewed = plainMessage.viewed;
    }

    function Comment(plainComment) {
        this.id = plainComment.id;
        this.details = plainComment.details;
        this.createDate = plainComment.createDate;
        this.userId = plainComment.userId;
        this.messageId = plainComment.messageId;
        this.issueId = plainComment.issueId;
    }

    function getMessages() {
        var async = $q.defer();

        // This is a hack since we don't really have a persistant server.
        // So I want to get all messages only once.
        if (messageLoaded) {
            async.resolve(messages);
        } else {
            messages = [];
            var getMessagesURL = "http://my-json-server.typicode.com/kmosh1/Community-Manager/messages";

            $http.get(getMessagesURL).then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var message = new Message(response.data[i]);
                    messages.push(message);
                }
                messageLoaded = true;
                async.resolve(messages);
            }, function (error) {
                async.reject(error);
            });
        }

        return async.promise;
    }


    function createMessage(subject, details, priority) {
        var async = $q.defer();

        var userId = userSrv.getActiveUser().id;
        moment.locale('he');
        var today = moment().format('L LT');

        var newMessage = new Message({
            id: messages[messages.length - 1].id + 1, subject: subject, details: details,
            createDate: today, priority: priority, userId: userId, viewed: [userId] 
        });

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/kmosh1/Community-Manager/messages", newMessage).then.....

        messages.push(newMessage);
        async.resolve(newMessage);

        return async.promise;
    }

    function getComments() {
        var async = $q.defer();

        // This is a hack since we don't really have a persistant server.
        // So I want to get all messages only once.
        if (commentLoaded) {
            async.resolve(comments);
        } else {
            comments = [];
            var getCommentsURL = "http://my-json-server.typicode.com/kmosh1/Community-Manager/comments";

            $http.get(getCommentsURL).then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var newComment = new Comment(response.data[i]);
                    comments.push(newComment);

                }
                commentLoaded = true;
                async.resolve(comments);
            }, function (error) {
                async.reject(error);
            });
        }

        return async.promise;
    }


    function addComment(details, messageId) {
        var async = $q.defer();

        var userId = userSrv.getActiveUser().id;
        moment.locale('he');
        var today = moment().format('L LT');

        var newComment = new Comment({
            id: comments[comments.length - 1].id + 1, details: details,
            createDate: today, userId: userId, messageId: messageId
        });

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/kmosh1/Community-Manager/comments", newComment).then.....

        comments.push(newComment);
        async.resolve(newComment);

        return async.promise;
    }

    function addIssueComment(details, issueId) {
        var async = $q.defer();

        var userId = userSrv.getActiveUser().id;
        moment.locale('he');
        var today = moment().format('L LT');

        var newComment = new Comment({
            id: comments[comments.length - 1].id + 1, details: details,
            createDate: today.toLocaleString(), userId: userId, issueId: issueId
        });

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/kmosh1/Community-Manager/comments", newComment).then.....

        comments.push(newComment);
        async.resolve(newComment);

        return async.promise;
    }

    function deleteMessage(message) {
        var async = $q.defer();
        var index = messages.indexOf(message);


        for (var i = 0; i < comments.length; i++) {
            if (comments[i].messageId === message.id) {
                deleteComment(comments[i]);
                i = -1;
            }
        }
        messages.splice(index, 1);
        async.resolve("Message deleted successfully");
        return async.promise;
    }

    function deleteComment(comment) {
        var async = $q.defer();
        var index = comments.indexOf(comment);
        comments.splice(index, 1);
        async.resolve("Comment deleted successfully");
        return async.promise;
    }

    function deletedAllMsgsCmntsByUserId(userId) {
        var async = $q.defer();
        // delete all user comments
        console.log("comments before deleting comments: " + JSON.stringify(comments))
        for (var i = 0; i < comments.length; i++) {
            if (comments[i].userId === userId) {
                deleteComment(comments[i]);
                i = -1;
            }
        }
        console.log("comments after deleting comments: " + JSON.stringify(comments))
        console.log("messages before deleting messages: " + JSON.stringify(messages))
        //delete all user messages 
        for (var i = 0; i < messages.length; i++) {
            if (messages[i].userId === userId) {
                deleteMessage(messages[i]);
                i = -1;
            }
        }
        console.log("messages after deleting messages: " + JSON.stringify(messages))
        console.log("comments after deleting messages: " + JSON.stringify(comments))
        async.resolve();
        return async.promise;
    }

    function msgViewed(message) {
        var async = $q.defer();
        var userId = userSrv.getActiveUser().id;
        if (message.viewed.indexOf(userId) != -1) {
            async.resolve("This user already viewed this message");
        } else {
            message.viewed.push(userId);
            async.resolve("Updated message was viewed by this user")
        }
        return async.promise;
    }

    return {
        getMessages: getMessages,
        createMessage: createMessage,
        getComments: getComments,
        addComment: addComment,
        addIssueComment: addIssueComment,
        deleteMessage: deleteMessage,
        deleteComment: deleteComment,
        deletedAllMsgsCmntsByUserId: deletedAllMsgsCmntsByUserId,
        msgViewed: msgViewed
    }

})