CmuntyMngr.controller("addressCtrl", function ($scope, addressSrv) {

    $scope.toggle = false;
    $scope.addrResults = [];
    $scope.cities = [];
    $scope.cityDetails = [];

    $scope.searchCity = function () {
        $scope.searchCities = [];
        $scope.toggle = false;
        var addrURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + $scope.cityText + "&types=(cities)&components=country:il&language=he&key=AIzaSyDSGm7w4gwOJhruZbOsoeE4hXbYLj8IqBA";
        addressSrv.getAddresses(addrURL).then(function (cities) {
            $scope.searchCities = cities;
        }, function (error) {
        })
    }
    $scope.searchAddr = function () {
        $scope.addrResults = [];
        var crntLocation = $scope.cityDetails[0].locationLat + "," + $scope.cityDetails[0].locationLng;
        var crntRadius = $scope.cityDetails[0].radius;
        var addrURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + $scope.addrText + "&types=address&location=" + crntLocation + "&radius=" + crntRadius + "&strictbounds&language=he&key=AIzaSyDSGm7w4gwOJhruZbOsoeE4hXbYLj8IqBA";

        https://maps.googleapis.com/maps/api/place/autocomplete/json?input=%D7%93%D7%91%D7%95&types=address&location=32.716221,35.127483&radius=5000&language=he&key=AIzaSyDSGm7w4gwOJhruZbOsoeE4hXbYLj8IqBA&strictbounds

        addressSrv.getAddresses(addrURL).then(function (adrresses) {
            $scope.addrResults = adrresses;
        }, function (error) {
        })
    }

    $scope.addAddress = function (result) {
        // Clean search box
        $scope.searchResults = [];
        $scope.searchText = result.main_text;
    }

    $scope.addCity = function (result) {
        // Clean search box
        $scope.searchCities = [];
        $scope.cityText = result.main_text;
        var addrURL = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + result.placeId + "&key=AIzaSyDSGm7w4gwOJhruZbOsoeE4hXbYLj8IqBA";
        addressSrv.getCityDetails(addrURL).then(function (cityDetails) {
            $scope.cityDetails = cityDetails;
        }, function (error) {
        })
    }

    $scope.cityFilter = function (addrSrch) {
        if (addrSrch.main_text.toLowerCase().includes($scope.cityText.toLowerCase())) {
            return true;
        } else {
            return false;
        }

    }

});