CmuntyMngr.factory("issuesSrv", function ($q, $http, userSrv) {

    function issue(addr, aprtmnt, city) {
        this.addr = addr;
        this.aprtmnt = aprtmnt;
        this.city = city;
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



    return {
        getTotal: getTotal
    }
})