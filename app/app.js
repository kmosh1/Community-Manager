var CmuntyMngr = angular.module("CmuntyMngr", ['ngRoute', 'ngImageInputWithPreview']);

CmuntyMngr.config(function ($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "app/home/home.html",
    controller: "lgnRgsCtrl"
  })
    .when("/home", {
      templateUrl: "app/home/home.html",
      controller: "lgnRgsCtrl"
    })
    .when("/messages", {
      templateUrl: "app/messages/messages.html"
    })
    .when("/dashboard", {
      templateUrl: "app/dashboard/dashboard.html"
    })
    .when("/tenants", {
      templateUrl: "app/tenants/tenants.html",
      controller: "lgnRgsCtrl"
    })
    .when("/upforvote", {
      templateUrl: "app/upforvote/upforvote.html",
      controller: "lgnRgsCtrl",
      controller: "votesCtrl"
    })
    .when("/issues", {
      templateUrl: "app/issues/issues.html",
      controller: "lgnRgsCtrl",
      controller: "issuesCtrl"
    })
    .otherwise({
      templateUrl: "app/404.html"
    })
})