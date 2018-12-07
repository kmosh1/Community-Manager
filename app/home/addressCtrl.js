CmuntyMngr.controller("addressCtrl", function ($scope, addressSrv) {

    $scope.toggle = false;
    var offset = 15000;
    var total = 201;
    $scope.adrresses = [];
    $scope.cities = [];

    $scope.searchCity = function () {
        $scope.searchCities = [];
        $scope.toggle = false;
        var addrURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + $scope.cityText + "&types=(cities)&components=country:il&language=he&key=AIzaSyDSGm7w4gwOJhruZbOsoeE4hXbYLj8IqBA";
        addressSrv.getAddresses(addrURL).then(function (cities) {
            $scope.searchCities = cities;
        }, function (error) {
        })
    }
    $scope.searchChange = function () {
        $scope.searchResults = [];
        var addrURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + $scope.searchText + "&types=address&components=country:il&language=he&key=AIzaSyDSGm7w4gwOJhruZbOsoeE4hXbYLj8IqBA";
        addressSrv.getAddresses(addrURL).then(function (adrresses) {
            $scope.searchResults = adrresses;
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
        $scope.toggle = !$scope.toggle;
    }

    $scope.cityFilter = function (addrSrch) {
        if (addrSrch.main_text.toLowerCase().includes($scope.cityText.toLowerCase())) {
            return true;
        } else {
            return false;
        }

    }

});