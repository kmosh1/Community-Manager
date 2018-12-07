CmuntyMngr.factory("votesSrv", function ($q, $http, userSrv) {

    function address(addr, aprtmnt, city) {
        this.addr = addr;
        this.aprtmnt = aprtmnt;
        this.city = city;
    }

    function addrSrch (main_text, placeId) {
        this.main_text = main_text;
        this.placeId = placeId;
    }


    // function citySrch (description) {
    //     this.description = description;
    // }

    var addressesLoaded = false;
    var adrresses = [];
    var total = 201;
    var offset = 0;
    var total = 201;


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