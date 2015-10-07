var app = angular.module('Providers', []);

app.factory('Providers', function() {
	var bills = [];
	var providers = 
	[
		{
			name: 'Amazon',
			id: 1,
			account: 608263488029,
			thumbnail: 'http://res.cloudinary.com/gravitant/image/upload/v1428597587/providers/amazonaws.jpg',
			bills: 
			[
				{
					invoice: 58880218,
					billingPeriod: {
						startDay: 1,
						startMonth: 8,
						startYear: 2015,
						endDay: 31,
						endMonth: 8,
						endYear: 2015
					},
					billingSummary: {
						charges: 40049.63,
						credits: 25.00,
						tax: 2565.11
					},
					consolidatedBillDetails:
					[
						{
							service: 'Amazon Route 53',
							charges: {
								total: 22.83,
								vat: 0,
								gst: 0,
								estimatedTax: 1.87,
								ct: 0
							}
						},
						{
							service: 'Amazon Simple Email Service',
							charges: {
								total: 12.58,
								vat: 0,
								gst: 0,
								estimatedTax: 0,
								ct: 0
							}
						},
						{
							service: 'Amazon Virtual Private Cloud',
							charges: {
								total: 37.20,
								vat: 0,
								gst: 0,
								estimatedTax: 2.46,
								ct: 0
							}
						},
						{
							service: 'Amazon Elastic Compute Cloud',
							charges: {
								total: 38508.69,
								credits: 25.00,
								vat: 0,
								gst: 0,
								estimatedTax: 2539.77,
								ct: 0
							}
						}
					],
					linkedAccounts: 
					[
						{
							account: 'grav-620-eng-qa',
							charges: 6830.93,
							credits: 0,
							estimatedTax: 450.83,
							details: [
							{
								service: 'AWS Data Transfer',
								charges: 15.85,
								estimatedTax: 1.04
							},
							{
								service: 'Amazon Elastic Compute Cloud',
								charges: 6815.08,
								estimatedTax: 449.79
							},
							{
								service: 'Amazon Simple Storage Service',
								charges: 0,
								estimatedTax: 0
							}]
						},
						{
							account: 'grav-730-product-clogeny',
							charges: 941.30,
							credits: 0,
							estimatedTax: 62.09,
							details: [
							{
								service: 'Amazon Route 53',
								charges: .18,
								estimatedTax: .01
							},
							{
								service: 'Amazon Elastic Compute Cloud',
								charges: 941.10,
								estimatedTax: 62.08
							},
							{
								service: 'Amazon Glacier',
								charges: 0,
								estimatedTax: 0
							}]
						},
						{
							account: 'Grav-700-cto-poc',
							charges: 1524.2,
							credits: 0,
							estimatedTax: 100.74,
							details: [
							{
								service: 'Amazon Route 53',
								charges: 6.58,
								estimatedTax: .54
							},
							{
								service: 'AWS Data Transfer',
								charges: 1.73,
								estimatedTax: .11
							},
							{
								service: 'Amazon Elastic Compute Cloud',
								charges: 1473.69,
								estimatedTax: 97.30
							},
							{
								service: 'Amazon Simple Storage Service',
								charges: .16,
								estimatedTax: .01
							}]
						}
					]
				}
			]
		}
	]

	var getProviderBills = function(provider) {
		switch (provider) {
			case 'amazon':
				for (var n=0; n < providers.length; n++) {
					if (provider == 'amazon') {
						return providers[n].bills;
					}
				}
				break;
		}
	}

	var calculateAmazonLinkedAccounts = function() {

	}
	









	return {
		getConsolidatedBills: function() {
			for (var n=0; n < providers.length; n++) {
				if (data == providers[n].id) {
					return providers[n];
				}
			}
			return getProviderBills('amazon')
		},
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

