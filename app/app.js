var CmuntyMngr = angular.module("CmuntyMngr", ['ngRoute']);

CmuntyMngr.config(function($routeProvider) {
    $routeProvider.when("/",{
      templateUrl: "app/home/home.html"
    })
    .when("/home",{
      templateUrl: "app/home/home.html"
    })
    .when("/messages",{
        templateUrl: "app/messages/messages.html",
        controller: "messagesCtrl"
      })
      .when("/dashboard",{
        templateUrl: "app/dashboard/dashboard.html"
      })
       .when("/manager/:mngrId",{
      templateUrl: "app/managers/manager.html",
      controller: "mngrCtrl"
    })
    .when("/tenant/:tnntId",{
        templateUrl: "app/tenants/tenant.html",
        controller: "tnnttrl"
      })
      .otherwise ({
      templateUrl: "app/404.html"
    })
  })