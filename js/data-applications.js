var app = angular.module('Applications', []);

app.factory('Applications', function() {
	var applications = 
	[
		{
			name: 'SharePoint',
			id: 1,
			owner: {
				firstName: 'John',
				lastName: 'Doe',
				email: 'jdoe@mail.com',
				phone: '512-555-1212'
			},
			cost: {
				current: 27543.45
			},
			infrastructure: {
				storage: {
					type: 'storage type',
					available: {
						size: 5,
						units: 'TB'
					},
					used: {
						size: 789,
						units: 'GB'
					}
				}
			}
		},
		{
			name: 'Wordpress',
			id: 2,
			owner: {
				firstName: 'John',
				lastName: 'Doe',
				email: 'jdoe@mail.com',
				phone: '512-555-1212'
			},
			cost: {
				current: 23453.05
			},
			infrastructure: {
				storage: {
					type: 'storage type',
					available: {
						size: 5,
						units: 'TB'
					},
					used: {
						size: 789,
						units: 'GB'
					}
				}
			}
		},
		{
			name: 'Microsoft Exchange',
			id: 3,
			owner: {
				firstName: 'John',
				lastName: 'Doe',
				email: 'jdoe@mail.com',
				phone: '512-555-1212'
			},
			cost: {
				current: 12500.45
			},
			infrastructure: {
				storage: {
					type: 'storage type',
					available: {
						size: 5,
						units: 'TB'
					},
					used: {
						size: 789,
						units: 'GB'
					}
				}
			}
		},
		{
			name: 'PeopleSoft',
			id: 3,
			owner: {
				firstName: 'John',
				lastName: 'Doe',
				email: 'jdoe@mail.com',
				phone: '512-555-1212'
			},
			cost: {
				current: 12500.45
			},
			infrastructure: {
				storage: {
					type: 'storage type',
					available: {
						size: 5,
						units: 'TB'
					},
					used: {
						size: 789,
						units: 'GB'
					}
				}
			}
		},
		{
			name: 'ADP',
			id: 3,
			owner: {
				firstName: 'John',
				lastName: 'Doe',
				email: 'jdoe@mail.com',
				phone: '512-555-1212'
			},
			cost: {
				current: 12500.45
			},
			infrastructure: {
				storage: {
					type: 'storage type',
					available: {
						size: 5,
						units: 'TB'
					},
					used: {
						size: 789,
						units: 'GB'
					}
				}
			}
		},
		{
			name: 'Hadoop',
			id: 3,
			owner: {
				firstName: 'John',
				lastName: 'Doe',
				email: 'jdoe@mail.com',
				phone: '512-555-1212'
			},
			cost: {
				current: 12500.45
			},
			infrastructure: {
				storage: {
					type: 'storage type',
					available: {
						size: 5,
						units: 'TB'
					},
					used: {
						size: 789,
						units: 'GB'
					}
				}
			}
		}
	];

	return {
		getApplications: function() {
			return applications
		},

		setApplications: function(data) {
			applications = data;
		},

		getApplication: function(data) {
			for (var n=0; n < applications.length; n++) {
				if (data == applications[n].id) {
					return applications[n];
				}
			}
		}
	}
})

