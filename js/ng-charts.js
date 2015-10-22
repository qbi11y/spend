var app = angular.module('Charts', []);

app.factory('Charts', function() {
	var date = new Date();
	var months = [
        { name: 'January',   monthOfYear: 1,  daysInMonth: 31, estimatedCost: [] },
        { name: 'February',  monthOfYear: 2,  daysInMonth: 28, estimatedCost: [] },
        { name: 'March',     monthOfYear: 3,  daysInMonth: 31, estimatedCost: [] },
        { name: 'April',     monthOfYear: 4,  daysInMonth: 30, estimatedCost: [] },
        { name: 'May',       monthOfYear: 5,  daysInMonth: 31, estimatedCost: [] },
        { name: 'June',      monthOfYear: 6,  daysInMonth: 30, estimatedCost: [] },
        { name: 'July',      monthOfYear: 7,  daysInMonth: 31, estimatedCost: [] },
        { name: 'August',    monthOfYear: 8,  daysInMonth: 31, estimatedCost: [] },
        { name: 'September', monthOfYear: 9,  daysInMonth: 30, estimatedCost: [] },
        { name: 'October',   monthOfYear: 10, daysInMonth: 31, estimatedCost: [] },
        { name: 'November',  monthOfYear: 11, daysInMonth: 30, estimatedCost: [] },
        { name: 'December',  monthOfYear: 12, daysInMonth: 31, estimatedCost: [] }
    ];

    createXAxis = function(numDays) {
    	var data = {};
        data.daysInMonth = [];
        data.estimatedCost = [];
        for (var n=1; n <= numDays; n++ ) {
            data.daysInMonth.push(n.toString());
            data.estimatedCost.push( (n + 10) * 10);
        }
        console.log('days in month', data.daysInMonth);
        return data
    }
    
	return {
		getPieChart: function(elemID, chartTitle, hoverUnit) {
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
        $('#'+elemID).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: chartTitle
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: false
                }
            },
            series: [{
                name: hoverUnit,
                colorByPoint: true,
                data: [{
                    name: "grav-620-eng-qa",
                    y: 56.33
                }, {
                    name: "Grav-700-cto-poc",
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: "grav-730-product-clogeny",
                    y: 10.38
                }, {
                    name: "Other",
                    y: 4.77
                }]
            }]
        });
		},
		getLineChart: function(elemID, chartTitle, series1, series2, dailyCharges) {
			// Make monochrome colors and set them as default for all pies
            console.log('charges for the chart', dailyCharges);
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
		        $('#'+elemID).highcharts({
		        chart: {
		            type: 'areaspline'
		        },
		        title: {
		            text: chartTitle
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
		            categories: createXAxis(months[date.getMonth()].daysInMonth).daysInMonth,
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
		            name: series1,
		            data: createXAxis(months[date.getMonth()].daysInMonth).estimatedCost
		        }, {
		            name: series2,
		            data: dailyCharges
		        }]
		    })
		}
	}
})