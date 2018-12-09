CmuntyMngr.factory("addressSrv", function ($q, $http) {

    function address(addr, aprtmnt, city) {
        this.addr = addr;
        this.aprtmnt = aprtmnt;
        this.city = city;
    }

    function addrSrch(main_text, placeId) {
        this.main_text = main_text;
        this.placeId = placeId;

    }

    function cityDetails(locationLat, locationLng, radius) {
        this.locationLat = locationLat;
        this.locationLng = locationLng;
        this.radius = radius;
    }

    // function citySrch (description) {
    //     this.description = description;
    // }


    var adrresses = [];
    var citiesDetails = [];



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
        }, function (error) {
            async.reject(error);
        });

        return async.promise;
    }

    function getCityDetails(cityDetailsUrl) {
        var proxyURL = "https://cors-anywhere.herokuapp.com/";
        cityDetailsUrl = proxyURL + cityDetailsUrl;
        citiesDetails = [];
        var async = $q.defer();
        $http.get(cityDetailsUrl).then(function (response) {
            // success - update the cityDetails
            var locationLat = response.data.result.geometry.location.lat;
            var locationLng = response.data.result.geometry.location.lng;
            var northeastLat = response.data.result.geometry.viewport.northeast.lat;
            var northeastLng = response.data.result.geometry.viewport.northeast.lng;
            var southwestLat = response.data.result.geometry.viewport.southwest.lat;
            var southwesttLng = response.data.result.geometry.viewport.southwest.lng;

            // calculate radius
            var radiusNE = getDistanceFromLatLonInKm(locationLat, locationLng, northeastLat, northeastLng);
            var radiusSW = getDistanceFromLatLonInKm(locationLat, locationLng, southwestLat, southwesttLng);
            var radius = (radiusNE > radiusSW) ? radiusNE : radiusSW;


            var newCityDetails = new cityDetails(locationLat, locationLng, radius);
            citiesDetails.push(newCityDetails);
            async.resolve(citiesDetails);
        }, function (error) {
            async.reject(error);
        });

        return async.promise;
    }


    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        d = parseInt(d * 1000);
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }




    return {
        getAddresses: getAddresses,
        getCityDetails: getCityDetails
    }
})