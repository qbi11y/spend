var app = angular.module('Data', []);

app.factory('Data', ['$http', function($http) {
	var charges = [];
	var providers = [];
	var providerAccts = [];
	setProviders = function(charges) {
		var providers_ar = [];
		for (var n=0; n < charges.length; n++) {
			providers_ar.push(charges[n].criteria.provider);
		}
		//console.log('added providers ', providers);
		providers = providers_ar.filter(function(elem, pos,arr) {
			return arr.indexOf(elem) == pos;
		});

		//console.log('set providers ', providers);
	}

	setCharges = function(ch) {
		
		charges = ch;
	}

	computeDailyTotals = function(charges) {
		var days = [];
		var daysTmp = [];
		var dailyCharges = [];
		console.log('charges to daily', charges)
		for (var n=0; n < charges.length; n++){
			daysTmp.push(charges[n].criteria.start_date.day_of_month);
		}

		days = daysTmp.filter(function(elem, pos, arr) {
			return arr.indexOf(elem) == pos
		});

		for (var n=0; n < days.length; n++) {
			var total = 0;
			for (var i=0; i < charges.length; i++ ) {
				if(days[n] == charges[i].criteria.start_date.day_of_month) {
					for (var j=0; j < charges[i].result.content.length; j++) {
						total += charges[i].result.content[j].amount * charges[i].result.content[j].quantity;					}
				}
			}
			dailyCharges.push(total);
		}
		return dailyCharges
	}
	computeTotalCharges = function(charges) {
		var total = 0
		for (var n=0; n < charges.length; n++) {
			for (var i=0; i < charges[n].result.content.length; i++) {
				total += charges[n].result.content[i].amount * charges[n].result.content[i].quantity;
			}
		}
		return total
	}

	computeProviderDailyTotals = function(provider) {
		var providerCharges = [];
		for (var n=0; n < charges.length; n++) {
			if (charges[n].criteria.provider == provider) {
				providerCharges.push(charges[n]);
			}
		}
		console.log('charges to work with', computeDailyTotals(providerCharges));
	}

	compileCharges = function(acctCharges) {
		var total = 0;
		for (var n=0; n < acctCharges.length; n++) {
			total += acctCharges[n].amount * acctCharges[n].quantity;
		}
		return total
	}
	return {
		init: function() {
			$http.get('js/usage-detailed.json').success(function(res) {
				setCharges(res);
				setProviders(res);
				//console.log('more prov', res);
			})
		},
		getDailyTotals: function() {
			return computeDailyTotals(charges);
		},

		getProviderDailyTotals: function(provider) {
			return computeProviderDailyTotals(provider);
		},
		getProviderTotal: function(provider) {
			var providerTotal = 0;
			for (var n=0; n < charges.length; n++) {
				if (charges[n].criteria.provider == provider) {
					for (var i=0; i < charges[n].result.content.length; i++) {
						providerTotal += charges[n].result.content[i].amount * charges[n].result.content[i].quantity;
					}
				}
			}
			return providerTotal
		},
		getTotalCharges: function() {
			console.log('charges to work with', computeTotalCharges(charges));
			return computeTotalCharges(charges);
		},
		setProviders: function() {

		},
		getProviders: function() {
			return providers
		},
		getProvider: function(provider) {
			return providers
			for (var n=0; n < providers.length; n++) {
				console.log(providers)
				if (providers[n].name == provider) {
					console.log('should be ', providers[n])
					return providers[n]
				} 
			}
		},
		setProviderAccts: function(provider) {
			var accounts = [];
			for (var n=0; n < charges.length; n++) {
				if (charges[n].criteria.provider == provider) {
					var account = {};
					account.total = compileCharges(charges[n].result.content)
					for (var i=0; i < charges[n].result.content.length; i++) {
						account.name = charges[n].result.content[i].tags.name;
						
						accounts.push(account);

					}
				}
			}
			providerAccts = accounts.filter(function(elem, pos,arr) {
				return arr.indexOf(elem) == pos;
			});
			console.log('prov accts ', providerAccts);
		},
		getProviderAccts: function() {
			return providerAccts
		},
		getLineItems: function(acct) {
			var lineItems = [];
			for (var n=0; n < charges.length; n++) {
				for (var i=0; i < charges[n].result.content.length; i++) {
					if (charges[n].result.content[i].tags.name == acct.name) {
						lineItems.push(charges[n].result.content[i]);
					}
				}
			}
			return lineItems
		},
		setCharges: function() {
			
		}
	}	
}])

