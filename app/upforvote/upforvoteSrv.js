CmuntyMngr.factory("upforvoteSrv", function ($q, $http, userSrv) {

    var upForVotes = [];
    var upForVoteLoaded = false;

    function upForVote(plainUpForVote) {
        this.id = plainUpForVote.id;
        this.createdBy = plainUpForVote.createdBy;
        this.createdAt = plainUpForVote.createdAt;
        this.title = plainUpForVote.title;
        this.details = plainUpForVote.details;
        this.options = plainUpForVote.options;
        this.dueDate = plainUpForVote.dueDate;
        this.votes = plainUpForVote.votes;
        this.voted = plainUpForVote.voted;
    }


    function getTotal(AddrSearchUrl) {
        var async = $q.defer();
        if (addressesLoaded) {
            async.resolve(total);
        } else {
            $http.get(AddrSearchUrl).then(function (response) {
                // success - update the addresses array
                total = response.data.result.total;
                async.resolve(total);
            }, function (error) {
                async.reject(error);
            });
        }
        return async.promise;
    }

    function getUpForVotes() {
        var async = $q.defer();

        // This is a hack since we don't really have a persistant server.
        // So I want to get all messages only once.
        if (upForVoteLoaded) {
            async.resolve(upForVotes);
        } else {
            upForVotes = [];
            var getupForVotesURL = "https://my-json-server.typicode.com/kmosh1/Community-Manager/upForVotes";

            $http.get(getupForVotesURL).then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var newupForVote = new upForVote(response.data[i]);
                    upForVotes.push(newupForVote);
                }
                upForVoteLoaded = true;
                async.resolve(upForVotes);
            }, function (error) {
                async.reject(error);
            });
        }

        return async.promise;
    }

    function addUpForVote(createdBy, title, details, options, dueDate) {

        // [{ "id": 1, "vote": "Yes"}, { "id": 2, "vote": "No"}]
        optionsString = []
        var voteOptions = options.split(",");
        for (var i = 0; i < voteOptions.length; i++) {
            optionsString.push({"id": i+1, "vote": voteOptions[i]})
        }
        
        var async = $q.defer();

        var UpForVote = new upForVote({
            id: upForVotes[upForVotes.length - 1].id + 1, createdBy: createdBy, createdAt: new Date().toLocaleString(),
            title: title, details: details, options: optionsString, dueDate: dueDate, votes: [], voted: []
        });

        // if working with real server:
        //$http.post("https://my-json-server.typicode.com/kmosh1/Community-Manager/upForVotes", newUpForVote).then.....

        upForVotes.push(UpForVote);
        async.resolve(UpForVote);

        return async.promise;
    }

    function deleteUpForVote() {

    }

    function updateVote(userVotedString, upforvote, vote, checkVoted) {
        var async = $q.defer();

        if (checkVoted) {
            upforvote.votes.splice(checkVoted-1, 1, vote);
            async.resolve("Your vote was updated successfully");
        } else {
            upforvote.votes.push(vote);
            upforvote.voted.push(userVotedString);
            async.resolve("Your vote was added successfully");
        }
        return async.promise;
   }



    return {
        getTotal: getTotal,
        getUpForVotes: getUpForVotes,
        addUpForVote: addUpForVote,
        deleteUpForVote: deleteUpForVote,
        updateVote: updateVote
    }
})