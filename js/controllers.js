var app = angular.module('Controllers',['Applications', 'Providers', 'Spend', 'Bills', 'Data', 'Charts']);

app.controller('MainCtrl', ['$scope', '$http', 'Bills', 'Data', 'Providers', 'Charts', function($scope, $http, Bills, Data, Providers, Charts) {
	window.scrollTo(0,0);
    Data.setCharges();
    
    //console.log($scope.totalCharges);
	window.setTimeout(function() {
        $scope.$apply(function() {
            $scope.totalCharges = Data.getTotalCharges();
        });
        Charts.getLineChart('linechart', 'Estimated Charges vs Actual Charges', 'Estimated Charges', 'Actual Charges');     
    }, 500);
}])

app.controller('ApplicationDetailsCtrl', ['$scope', '$stateParams', '$state', 'Applications', 'Data', function($scope, $stateParams, $state, Applications, Data) {
	window.scrollTo(0,0);
	$scope.backPage = Data.getBackPage();
	$scope.application = Applications.getApplication($stateParams.id);
}])

app.controller('ProviderCtrl', ['$scope', '$state', 'Providers', function($scope, $state, Providers) {
	window.scrollTo(0,0);
	$scope.providers = Providers.getProviders();
	$scope.showProviderDetails = function(providerID) {
		$state.go('providerDetails', {id: providerID});
	}
}]);

app.controller('ProviderDetailsCtrl', ['$scope', '$http', '$stateParams', '$state', 'Providers', 'Data', 'Charts', function($scope, $http, $stateParams, $state, Providers, Data, Charts) {
	window.scrollTo(0,0);
    $http.get('js/usage-detailed.json').success(function(res) {
        console.log(res);
    })
	window.setTimeout(function() {
        Charts.getLineChart('providerDetailsAcctLine', 'Estimated Charges vs Actual Charges', 'Estimated Charges', 'Actual Charges');
        Charts.getPieChart('providerDetailsAcctPie', 'Account Charges', 'Percentage');
    }, 500)
	$scope.provider = Providers.getProvider($stateParams.id);
	$scope.applications = $scope.provider.applications;
	$scope.accounts = $scope.provider.bills[0].linkedAccounts;

	$scope.changeView = function(view) {

	}
	$scope.showApplicationDetails = function(appID, backPage) {
		Data.setBackPage(Providers.getProvider(backPage));
		$state.go("applicationDetails", {id: appID});
	}
}])