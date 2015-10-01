var app = angular.module('Providers', []);

app.factory('Providers', function() {
	var providers = 
	[
		{
			name: 'Amazon',
			id: 1,
			thumbnail: 'path here',
			cost: {
				current: 34636.45
			}
		},
		{
			name: 'Azure',
			id: 2,
			thumbnail: 'path here',
			cost: {
				current: 346636.45
			}
		},
		{
			name: 'Google',
			id: 3,
			thumbnail: 'path here',
			cost: {
				current: 346636.45
			}
		}
	];

	return {
		getProviders: function() {
			return providers;
		},
		setProviders: function(data) {
			providers = data
		},
		getProvider: function(data) {
			for (var n=0; n < providers.length; n++) {
				if (data == providers[n].id) {
					return providers[n];
				}
			}
		}
	}
})

