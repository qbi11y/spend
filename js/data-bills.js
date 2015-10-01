var app = angular.module('Bills', []);

app.factory('Bills', function() {
	var bills = 
	[
		{
			billID: 1,
			providerID: 1,
			date: {
				year: 2015,
				month: 1
			},
			cost: {
				actual: 123451,
				projected: 13456
			}
		},
		{
			billID: 2,
			providerID: 2,
			date: {
				year: 2015,
				month: 1
			},
			cost: {
				actual: 123452,
				projected: 13456
			}
		},
		{
			billID: 3,
			providerID: 3,
			date: {
				year: 2015,
				month: 1
			},
			cost: {
				actual: 123453,
				projected: 13456
			}
		}
	];

	return {
		getBills: function() {
			return bills;
		}
	}
})

