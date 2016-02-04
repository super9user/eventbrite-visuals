// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require libs/select2
//= require libs/underscore
//= require libs/bootstrap
//= require libs/moment
//= require libs/daterangepicker




$(document).ready(function(){
	// common daterangepicker initialize function for the app
	$('.datepicker-container input[name="daterange"]').daterangepicker({
		format: 'MM/DD/YYYY',
		startDate: moment().subtract("month", 3).format("MM/DD/YYYY"),
		endDate: moment().format("MM/DD/YYYY"),
		ranges: {
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
			'Last 7 Days': [moment().subtract('days', 6), moment()],
			'Last 30 Days': [moment().subtract('days', 29), moment()],
			'This Month': [moment().startOf('month'), moment().endOf('month')],
			'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
		}

	}, function(start, end){
		// _reports[_reports.type]();
	});

	$('.button_proceed').click(function(){
		var query = ""
		var inputs = $('.home_input');
		_.each(inputs, function(obj, index){
			query += $(obj).attr("name") + "=" + $(obj).val();
			if(index != inputs.length - 1){
				query += "&";	
			}
		});
		window.open("visuals?" + query, '_self', false)
	});

});

// return the query parameters as a JSON variable
function getJsonFromUrl() {
	var query = location.search.substr(1);
	var result = {};
	query.split("&").forEach(function(part) {
	var item = part.split("=");
	result[item[0]] = decodeURIComponent(item[1]);
	});
	return result;
}

function loader(div){
	str = '<div class="tc loading_screen_bars">\
		<div id="dot1" class="loader-dot"></div>\
		<div id="dot2" class="loader-dot"></div>\
		<div id="dot3" class="loader-dot"></div>\
	</div>';
	if($(div).length > 0){
		$(div).append(str);
	}
	return str;
};