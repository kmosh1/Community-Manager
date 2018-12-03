CmuntyMngr.factory("messages", function ($q, $http) {

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
    }

    function Comment(plainComment) {
        this.id = plainComment.id;
        this.subject = plainComment.subject;
        this.details = plainComment.details;
        this.createDate = plainComment.createDate;
        this.userId = plainComment.userId;
        this.messageId = plainComment.messageId;
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
            
            $http.get(getMessagesURL).then(function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    var message = new Message(response.data[i]);
                    messages.push(message);
                }
                messageLoaded = true;
                async.resolve(messages);
            }, function(error) {
                async.reject(error);
            });
        }

        return async.promise;
    }


    function createMessage(subject, details, priority) {
        var async = $q.defer();

        //var userId = loginSrv.getCurrentUser().id;

        var newMessage = new Message({id:-1, subject: subject, details: details,
            createDate: new Date(month, day, year, hours, minutes), userId: userId});

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
            var getCommentsURL = "http://my-json-server.typicode.com/kmosh1/Community-Manager/messages";
            
            $http.get(getCommentsURL).then(function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    var newComment = new Comment(response.data[i]);
                    comments.push(newComment);
                }
                commentLoaded = true;
                async.resolve(comments);
            }, function(error) {
                async.reject(error);
            });
        }

        return async.promise;
    }


    function addComment(subject, details,messageId) {
        var async = $q.defer();

        //var userId = loginSrv.getCurrentUser().id;

        var newComment = new Comment({id:-1, subject: subject, details: details,
            createDate: new Date(month, day, year, hours, minutes), userId: userId, messageId: messageId});

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/kmosh1/Community-Manager/messages", newMessage).then.....

        comments.push(newComment);
        async.resolve(newComment);

        return async.promise;
    }

    return {
        getMessages: getMessages,
        createMessage: createMessage,
        getComments: getComments,
        addComment: addComment
    }

})