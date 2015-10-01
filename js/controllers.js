var app = angular.module('Controllers',['Applications', 'Providers', 'Spend', 'Bills', 'Data']);

app.controller('MainCtrl', ['$scope', 'Bills', 'Data', function($scope, Bills, Data) {
	$scope.bills = Bills.getBills();
	$scope.billTotal = Data.getBillTotal($scope.bills);
}])

app.controller('ApplicationCtrl', ['$scope', '$state', 'Applications', function($scope, $state, Applications) {
	console.log(Applications.getApplications());
	$scope.applications = Applications.getApplications();
	$scope.showApplicationDetails = function(appID) {
		console.log(appID);
		$state.go("applicationDetails", {id: appID});
	}
}]);

app.controller('ApplicationDetailsCtrl', ['$scope', '$stateParams', '$state', 'Applications', function($scope, $stateParams, $state, Applications) {
	console.log('applciation details', $stateParams);
	console.log(Applications.getApplication($stateParams.id));
	$scope.application = Applications.getApplication($stateParams.id);
}])

app.controller('ProviderCtrl', ['$scope', '$state', 'Providers', 'Data', 'Bills', function($scope, $state, Providers, Data, Bills) {
	console.log(Providers.getProviders());
	$scope.providers = Providers.getProviders();
	$scope.providerBillTotals = Data.getProviderBillTotals(Providers.getProviders(), Bills.getBills());
	console.log($scope.providerBillTotals);
	$scope.showProviderDetails = function(providerID) {
		$state.go("providerDetails", {id: providerID})
	}
}]);

app.controller('ProviderDetailsCtrl', ['$scope', '$stateParams', '$state', 'Providers', function($scope, $stateParams, $state, Providers) {
	$scope.provider = Providers.getProvider($stateParams.id);
}])