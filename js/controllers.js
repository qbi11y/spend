var app = angular.module('Controllers',['Applications', 'Providers', 'Spend', 'Bills', 'Data']);

app.controller('MainCtrl', ['$scope', 'Bills', 'Data', 'Providers', function($scope, Bills, Data, Providers) {
	window.scrollTo(0,0);
	window.setTimeout(function() {
     // Make monochrome colors and set them as default for all pies
    Highcharts.getOptions().plotOptions.pie.colors = (function () {
        var colors = [],
            base = Highcharts.getOptions().colors[0],
            i;

        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }());
    // Build the chart
        $('#piechart').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Estimate Charges vs Actual Charges'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories: [
                '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
            ],
            plotBands: [{ // visualize the weekend
                from: 0,
                to: 0,
                color: 'rgba(68, 170, 213, .2)'
            }]
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' USD'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'Estimated Budget',
            data: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15]
        }, {
            name: 'Actual Budget',
            data: [1, 3, 4, 3, 3, 5, 4, 6, 4, 5, 6, 9]
        }]
    });
    }, 500)
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

app.controller('ApplicationCtrl', ['$scope', '$state', 'Applications', 'Data', 'Providers', function($scope, $state, Applications, Data, Providers) {
	window.scrollTo(0,0);
	$scope.applications = Applications.getApplications();
	$scope.backPage = 'dashboard';
	$scope.showApplicationDetails = function(appID, backPage) {
		console.log('back app details ', backPage);
		if (backPage != 'dashboard' && backPage != 'applications') {
			Data.setBackPage(Providers.getProvider(backPage));	
		} else {
			console.log('back ', backPage);
			Data.setBackPage(backPage);
		}
		
		$state.go("applicationDetails", {id: appID});
	}
}]);

app.controller('ApplicationDetailsCtrl', ['$scope', '$stateParams', '$state', 'Applications', 'Data', function($scope, $stateParams, $state, Applications, Data) {
	window.scrollTo(0,0);
	$scope.backPage = Data.getBackPage();
	$scope.application = Applications.getApplication($stateParams.id);
}])

app.controller('ProviderCtrl', ['$scope', '$state', 'Providers', 'Data', 'Bills', function($scope, $state, Providers, Data, Bills) {
	window.scrollTo(0,0);
	$scope.providers = Providers.getProviders();
	$scope.showProviderDetails = function(providerID) {
		$state.go('providerDetails', {id: providerID});
	}
}]);

app.controller('ProviderDetailsCtrl', ['$scope', '$stateParams', '$state', 'Providers', 'Data', function($scope, $stateParams, $state, Providers, Data) {
	window.scrollTo(0,0);
	$scope.provider = Providers.getProvider($stateParams.id);
	$scope.applications = $scope.provider.applications;
	$scope.accounts = $scope.provider.bills[0].linkedAccounts;

	$scope.showApplicationDetails = function(appID, backPage) {
		Data.setBackPage(Providers.getProvider(backPage));
		$state.go("applicationDetails", {id: appID});
	}
}])