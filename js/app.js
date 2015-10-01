var app = angular.module('Spend',['Controllers', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('dashboard', {
      url: "/",
      templateUrl: "views/main.html"
    })

    .state('applicationDetails', {
      url: "/application/?id",
      templateUrl: "views/application-details.html",
      controller: "ApplicationDetailsCtrl"
    })

    .state('providerDetails', {
      url: "/provider/?id",
      templateUrl: "views/provider-details.html",
      controller: "ProviderDetailsCtrl"
    })

    .state('applications', {
      url: "/applications",
      templateUrl: "views/applications.html",
      controller: "ApplicationCtrl"
    });

    /*
    .state('state1.list', {
      url: "/list",
      templateUrl: "partials/state1.list.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "partials/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
	*/
});