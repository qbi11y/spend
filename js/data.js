var app = angular.module('Data', []);

app.factory('Data', ['$http', function($http) {
	var charges = [];
	var providers = [];
	getProviders = function(charges) {
		//console.log('charges ', charges[n].criteria);
		if (providers.length == 0) {
			var provider = {};
			provider.name = charges[0].criteria.provider;
			provider.charges = [];
			providers.push(provider);
		} else {
			for (var n=0; n < charges.length; n++) {
				for (var i=0; i < providers.length; i++) {
					if (providers[i].name == charges[n].criteria.provider) {
						break
					} else if (i == charges.length) {
						var provider = {};
						provider.name = charges[n].criteria.provider;
						provider.charges = [];
						providers.push(provider);
					}
				}
			}
		}
		//console.log(providers);
		return providers		
	}
	return {
		getTotalCharges: function() {
			console.log('charges ', charges);
			var providers = getProviders(charges);
			for (var n=0; n < providers.length; n++) {
				for (var i=0; i < charges.length; i++) {
					//console.log('loop ', providers[n]);
					
					if ( providers[n].name == charges[i].criteria.provider) {
						//console.log('results ', charges[i].result)
						providers[n].charges.push(charges[i].result);
					}
				}
			}
			return providers
		},
		setCharges: function() {
			$http.get('js/usage-detailed.json').success(function(res) {
				charges = res;
			})
		}
	}	
}])

