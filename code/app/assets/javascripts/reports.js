var colors = ["#a28ccb", "#da7b80", "#2bb5e2", "#e8bc66", "#d390b6", "#a0a7d6", "#e8cc75", "#1f4262", "#148486", "#67528f", "#a94248", "#22809e", "#9c7426", "#982968", "#615c38", "#e0e0e0", "#53a3eb", "#31bbbc"]

event_comparison = function(data){
	var _i = {};
	_i.data = data;
	_i.process = function(){
		// Processor function for this report. Converts input data into required form.
		var series_data = [];
		var count = 0;
		_.each(_i.data, function(obj){
			// if(count<5){
				options = {};
				options.type = 'area';
				options.name = obj["name"];
				options.color = colors[count];
				options.stacking = "normal";
				var temp_data = [];
				_.each(obj["timestamp_values"], function(val){
					temp_data.push([val, obj["capacity"]]);
				});
				options.gapSize = 5;
				h1 = {};
				h1["valueDecimals"] = 2;
                options.tooltip =  h1;

                h2 = {};
                h3 = {};
                h3["x1"] = 0;
                h3["x2"] = 0;
                h3["y1"] = 0;
                h3["y2"] = 1;
                h2["linearGradient"] = h3;
                h2["stops"] = [[0, colors[count]], [1, Highcharts.Color(colors[count]).setOpacity(0).get('rgba')]];
                options.fillColor = h2;
                options.threshold = null;

				options.data = temp_data;
				series_data.push(options);
				count += 1;
			// }
		});
		_i.series_data = series_data;
	};

	_i.generate = function(){
		// Main generator function
		Highcharts.setOptions({
			global: {
				useUTC: true
			},
			chart: {
		        style: {
		            fontFamily: '"Ubuntu",Helvetica,Arial,sans-serif'
		        }
		    }
		});
		_i.render_chart();
	};

	_i.render_chart = function(){
		// This function is responsible for rendering the visualization using Highcharts.
		try{
			_i.process();
			_i.chart = $('.main_container .reports').highcharts('StockChart', {
				chart: {
					alignTicks: false
				},
				credits: {
					enabled: false
	  			},
				rangeSelector: {
					inputEnabled: false,
					buttons: [{
						type: 'week',
						count: 1,
						text: '1w'
					}, {
						type: 'month',
						count: 1,
						text: '1m'
					}, {
						type: 'month',
						count: 6,
						text: '6m'
					}, {
						type: 'year',
						count: 1,
						text: '1y'
					}, {
						type: 'all',
						text: 'All'
					}]
				},
				title: false,
				legend: {
					enabled: true,
					itemDistance: 30,
					itemMarginTop: 15,
					padding: 20,
				},
				tooltip: {
					formatter: function(){
						var output = '';
						output = '<b>' + Highcharts.dateFormat('%A, %b %e, %Y', this.x) + '</b>';
						output += '<br/> <span style="color:#000;">Name of Event:  Capacity</span>';
						_.each(this.points, function(point){
							output += '<br/> <span style="color:'+point.series.color+'">'+point.series.name +'</span>:  ' + point.y;
						});
						return output;
					},
					shared: true
				},
				yAxis: {
					title: false
				},
				xAxis: _i.xAxis,
				series: _i.series_data
			});
		}catch(e){
			console.log("Error.");
		}
	}
	_i.generate();
};