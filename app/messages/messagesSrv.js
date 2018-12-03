CmuntyMngr.factory("messages", function ($q, $http, loginSrv) {

    var messages = [];
    var wasLoaded = false;

    function Message(plainMessage) {
        this.id = plainMessage.id;
        this.subject = plainMessage.subject;
        this.details = plainMessage.details;
        this.comments = plainMessage.comments;
        this.createDate = plainMessage.createDate;
        this.priority = plainMessage.priority;
        this.userId = plainMessage.userId;
    }

    function getMessages() {
        var async = $q.defer();

        // This is a hack since we don't really have a persistant server.
        // So I want to get all messages only once.
        if (wasLoaded) {
            async.resolve(messages);
        } else {
            messages = [];
            var getMessagesURL = "http://my-json-server.typicode.com/kmosh1/Community-Manager/messages";
            
            $http.get(getMessagesURL).then(function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    var message = new Message(response.data[i]);
                    messages.push(message);
                }
                wasLoaded = true;
                async.resolve(messages);
            }, function(error) {
                async.reject(error);
            });
        }

        return async.promise;
    }


    function createMessage(subject, details, priority) {
        var async = $q.defer();

        var userId = user.getActiveUser().id;

        var newMessage = new Mecipe({id:-1, subject: subject, details: details,
            comments: [], createDate: steps, userId: userId});

        // if working with real server:
        //$http.post("http://my-json-server.typicode.com/kmosh1/Community-Manager/messages", newMessage).then.....

        messages.push(newMessage);
        async.resolve(newMessage);

        return async.promise;
    }


    return {
        getMessages: getMessages,
        createMessage: createMessage
    }





}