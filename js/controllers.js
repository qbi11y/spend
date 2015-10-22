var app = angular.module('Controllers',['Applications', 'Providers', 'Spend', 'Bills', 'Data', 'Charts']);

app.controller('DashCtrl', ['$scope', '$http','$state', 'Data', 'Charts', function($scope, $http, $state, Data, Charts) {
	window.scrollTo(0,0);
    Data.init();
    $scope.sortCategory = '';
    $scope.sortOrder = 'desc';
    $scope.orderBy = '-total';
    $scope.getProviderTotal = function(provider) {
        return Data.getProviderTotal(provider);
    }
    $scope.showProviderDetails = function(providerID) {
        $state.go('providerDetails', {id: providerID});
    }

    $scope.getProviderLogo = function(provider) {
        return Data.getProviderLogo(provider);
    }

    $scope.sortList = function(order, category) {
        $scope.sortCategory = category;
        $scope.sortOrder = order;
        if (order == 'desc') {
            $scope.orderBy = '-total';
        } else {
            $scope.orderBy = 'total';
        }
    }

    $scope.isSorted = function(order, category) {
        if ($scope.sortCategory == category && $scope.sortOrder == order) {
            return true
        } else {
            return false
        }
    }

    //console.log($scope.totalCharges);
	window.setTimeout(function() {
        $scope.$apply(function() {
            //$scope.totalCharges = Data.getTotalCharges();
            console.log('providers', Data.getProviders());
            $scope.providers = Data.getProviders();
            $scope.totalCharges = Data.getTotalCharges();
            $scope.totalDailyCharges = Data.getDailyTotals();
            console.log('providers for pie ', $scope.totalCharges);
            $scope.services = Data.getServiceTotals();
            Charts.getLineChart('dashboardLine', 'Estimated Charges vs Actual Charges', 'Estimated Charges', 'Actual Charges', Data.getDailyTotals());
            Charts.getPieChart('dashboardPie', 'Account Charges', 'Percentage', Data.convertData('pie', Data.getProviderTotals()));
        });     
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
	
}]);

app.controller('ProviderDetailsCtrl', ['$scope', '$http', '$stateParams', '$state', 'Providers', 'Data', 'Charts', function($scope, $http, $stateParams, $state, Providers, Data, Charts) {
	window.scrollTo(0,0);
    $http.get('js/usage-detailed.json').success(function(res) {
        console.log(res);
    })
	window.setTimeout(function() {
        Charts.getLineChart('providerDetailsAcctLine', 'Estimated Charges vs Actual Charges', 'Estimated Charges', 'Actual Charges', Data.getProviderDailyTotals($stateParams.id));
        Charts.getPieChart('providerDetailsAcctPie', 'Account Charges', 'Percentage', Data.convertData('pie', Data.getProviderAccts()));
    }, 500);
    Data.setProviderAccts($stateParams.id);
	$scope.providers = Data.getProvider($stateParams.id);
    $scope.currProvider = $stateParams.id;
    $scope.sortBy = 'desc';
    $scope.orderListBy = '-total';
    console.log('the providers ', $scope.providers);
    $scope.providerAccts = Data.getProviderAccts();

    $scope.computeProviderAvgDailySpend = function(provider) {
        return Data.getProviderAvgDailySpend(provider);
    }
    $scope.showProviderDetails = function(providerID) {
        $state.go('providerDetails', {id: providerID});
    }

    $scope.sortList = function(type) {
        $scope.sortBy = type;
        if (type == 'asc') {
            $scope.orderListBy = 'total';
        } else {
            $scope.orderListBy = '-total';
        }
    }
    $scope.computeAcctTotal = function(accts) {
        var total = 0
        for (var n=0; n < accts.length; n++) {
            console.log('each account', accts[n].total);
            total += accts[n].total;
        }
        return total
    }

	$scope.showLineItems = function(acct) {
        console.log('line items ', acct);
        $scope.lineItems = Data.getLineItems(acct);
        $scope.currAcct = acct;
    }
	$scope.showApplicationDetails = function(appID, backPage) {
		Data.setBackPage(Providers.getProvider(backPage));
		$state.go("applicationDetails", {id: appID});
	}
}])