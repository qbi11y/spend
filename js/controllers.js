var app = angular.module('Controllers',['Applications', 'Providers', 'Spend', 'Bills', 'Data']);

app.controller('MainCtrl', ['$scope', 'Bills', 'Data', 'Providers', function($scope, Bills, Data, Providers) {
	//	console.log(Providers.getBills());
	//$scope.bills = Providers.getConsolidatedBills();
	//$scope.billTotal = Data.getBillTotal($scope.bills);
	$scope.dashboardView = 'overview';
	$scope.updateDashboard = function(view) {
		if (view == 'org') {
			$scope.dashboardView = 'org';
			$('#overview').removeClass('active');
			$('#org').addClass('active');
		} else {
			$scope.dashboardView = 'overview';
		}
	}
}])

app.controller('ApplicationCtrl', ['$scope', '$state', 'Applications', function($scope, $state, Applications) {
	$scope.applications = Applications.getApplications();
	$scope.showApplicationDetails = function(appID) {
		console.log(appID);
		$state.go("applicationDetails", {id: appID});
	}
}]);

app.controller('ApplicationDetailsCtrl', ['$scope', '$stateParams', '$state', 'Applications', function($scope, $stateParams, $state, Applications) {
	window.scrollTo(0,0);
	$scope.application = Applications.getApplication($stateParams.id);
}])

app.controller('ProviderCtrl', ['$scope', '$state', 'Providers', 'Data', 'Bills', function($scope, $state, Providers, Data, Bills) {
	Data.setProviderBillTotals();
	$scope.providerBillTotals = Data.getProviderBillTotals(Providers.getProviders(), Bills.getBills());
	$scope.showProviderDetails = function(providerID) {
		$state.go("providerDetails", {id: providerID})
	}
}]);

app.controller('ProviderDetailsCtrl', ['$scope', '$stateParams', '$state', 'Providers', function($scope, $stateParams, $state, Providers) {
	$scope.provider = Providers.getProvider($stateParams.id);
}])