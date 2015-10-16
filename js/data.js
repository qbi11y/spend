var app = angular.module('Data', []);

app.factory('Data', ['$http', function($http) {
	var charges = [];
	var providerCharges = [];
	return {
		getTotalCharges: function() {
			console.log(charges);
		},
		setCharges: function() {
			$http.get('js/usage-detailed.json').success(function(res) {
				charges = res;
			})
		}
	}	
}])

