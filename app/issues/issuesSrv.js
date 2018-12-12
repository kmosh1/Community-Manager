CmuntyMngr.factory("issuesSrv", function ($q, $http, userSrv) {

    var issues = [];
    var issueLoaded = false;

    function issue(plainIssue) {
        this.id = plainIssue.id;
        this.openedBy = plainIssue.openedBy;
        this.openedAt = plainIssue.openedAt;
        this.title = plainIssue.title;
        this.details = plainIssue.details;
        this.options = plainIssue.options;
        this.dueDate = plainIssue.dueDate;
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
            }, function(error) {
                async.reject(error);
            });
        }
        return async.promise;
    }

    function getIssues() {
        var async = $q.defer();

        // This is a hack since we don't really have a persistant server.
        // So I want to get all messages only once.
        if (issueLoaded) {
            async.resolve(issues);
        } else {
            issues = [];
            var getIssuesURL = "http://my-json-server.typicode.com/kmosh1/Community-Manager/issues";
            
            $http.get(getIssuesURL).then(function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    var newIssue = new issue(response.data[i]);
                    issues.push(newIssue);
                }
                issueLoaded = true;
                async.resolve(issues);
            }, function(error) {
                async.reject(error);
            });
        }

        return async.promise;
    }


    return {
        getTotal: getTotal,
        getIssues: getIssues
    }
})