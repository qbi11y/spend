var app = angular.module('Charts', []);

app.factory('Charts', function() {
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
		getLineChart: function(elemID, chartTitle, series1, series2) {
			// Make monochrome colors and set them as default for all pies
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
		            categories: [
		                '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
		            ],
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
		            data: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15]
		        }, {
		            name: series2,
		            data: [1, 3, 4, 3, 3, 5, 4, 6, 4, 5, 6, 9]
		        }]
		    })
		}
	}
})