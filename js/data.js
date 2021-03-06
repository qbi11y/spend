var app = angular.module('Data', []);

app.factory('Data', ['$http', function($http) {
	var charges = [];
	var providers = [];
	var providerAccts = [];
	var providerLogos = [
	{ name: 'aws', url: 'images/aws.png' },
	{ name: 'azure', url: 'images/azure.png' }
	];

	setProviders = function(charges) {
		var providers_ar = [];
		for (var n=0; n < charges.length; n++) {
			providers_ar.push(charges[n].criteria.provider);
		}
		providers = providers_ar.filter(function(elem, pos,arr) {
			return arr.indexOf(elem) == pos;
		});
	}

	setCharges = function(ch) {		
		charges = ch;
	}

	computeDailyTotals = function(charges) {
		var days = [];
		var daysTmp = [];
		var dailyCharges = [];
		var spendData = {};
		
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
		spendData.numDays = days.length;
		spendData.charges = dailyCharges;
		return spendData
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
		return computeDailyTotals(providerCharges).charges;
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
			})
		},

		getServiceTotals: function() {
			var servicesNamesTmp = [];
			var services = []
			for (var n=0; n < charges.length; n++) {
				for (var i=0; i < charges[n].result.content.length; i++) {
					servicesNamesTmp.push(charges[n].result.content[i].attributes.product_name);
				}
			}
			var serviceNames = servicesNamesTmp.filter(function(elem, pos,arr) {
				return arr.indexOf(elem) == pos;
			});

			for (var n=0; n < serviceNames.length; n++) {
				var total = 0;
				var service = {}
				for (var i=0; i < charges.length; i++) {
					for (var j=0; j < charges[i].result.content.length; j++) {
						if (serviceNames[n] == charges[i].result.content[j].attributes.product_name) {
							total += charges[i].result.content[j].amount * charges[i].result.content[j].quantity;
						}
					}
					
				}
				service.name = serviceNames[n];
				service.total = total;
				services.push(service);
			}
			return services
		},
 
		getProviderAvgDailySpend: function(provider) {
			var total = 0;
			for (var n=0; n < computeProviderDailyTotals(provider).length; n++) {
				total += computeProviderDailyTotals(provider)[n];
			}
			return total / computeProviderDailyTotals(provider).length
		},

		convertData: function(type, data) {
			switch (type) {
				case 'pie':
					var pieData = [];
					for (var n=0; n < data.length; n++) {
						var slice = {};
						slice.name = data[n].name;
						slice.y = data[n].total;
						slice.sliced = false;
						slice.selected = false;
						pieData.push(slice);
					}
					return pieData;
			}
		},
		getDailyTotals: function() {
			return computeDailyTotals(charges).charges;
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

		getProviderTotals: function() {
			var providerData = [];
			for (var n=0; n < providers.length; n++) {
				var total = 0;
				var provider = {};
				for (var i=0; i < charges.length; i++) {
					if ( providers[n] == charges[i].criteria.provider) {
						total += compileCharges(charges[i].result.content)
					}
				}
				provider.name = providers[n];
				provider.total = total;
				providerData.push(provider);
			}
			return providerData
		},

		getTotalCharges: function() {
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
				if (providers[n].name == provider) {
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

		getProviderLogo: function(provider) {
			for (var n=0; n < providerLogos.length; n++) {
				if (providerLogos[n].name == provider) {
					return providerLogos[n].url;
				}
			}
		},
		setCharges: function() {
			
		}
	}	
}])

