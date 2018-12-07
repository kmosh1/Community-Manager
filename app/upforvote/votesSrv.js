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

    function getAddresses(AddrSearchUrl) {
        var proxyURL = "https://cors-anywhere.herokuapp.com/";
        AddrSearchUrl = proxyURL + AddrSearchUrl;
        adrresses = [];
        var async = $q.defer();
            $http.get(AddrSearchUrl).then(function (response) {
                // success - update the addresses array
                for (var i in response.data.predictions) {
                    // var newAddr = new address(response.data.predictions[i].שם_רחוב, 1, response.data.predictions[i].שם_ישוב);
                    var newAddr = new addrSrch(response.data.predictions[i].structured_formatting.main_text, response.data.predictions[i].place_id);
                    adrresses.push(newAddr);
                }
                async.resolve(adrresses);
            }, function(error) {
                async.reject(error);
            });
        
        return async.promise;
    }

    return {
        getAddresses: getAddresses,
        getTotal: getTotal
    }
})