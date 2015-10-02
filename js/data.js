var app = angular.module('Data', []);

app.factory('Data', function() {
	var billTotal = 0;
	var providerBillTotals = [];

	return {
		getBillTotal: function(bills) {
			billTotal = 0;
			for (var n=0; n < bills.length; n++) {
				billTotal += bills[n].cost.actual
			}
			return billTotal;
		},

		getProviderBillTotals: function(providers, bills) {
			providerBillTotals = [];
			for (var n=0; n < providers.length; n++) {
				var providerBillTotal = 0;
				for (var i=0; i < bills.length; i++) {
					if (providers[n].id == bills[i].providerID) {
						providerBillTotal += bills[i].cost.actual
					}
				}
				var provider = {};
				provider.name = providers[n].name;
				provider.thumbnail = providers[n].thumbnail;
				provider.billTotal = providerBillTotal;
				providerBillTotals.push(provider);
			}
			return providerBillTotals;
		},

		setProviderBillTotals: function() {
			providerBillTotals = [];
		}
	}
	
})

