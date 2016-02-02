//= require libs/highstock
//= require reports

$(document).ready(function(){
	setInputFromParams();

	$('.visual_container .button_refresh').click(function(){
		var inputs = $('.input_section').find('input');
		var params = {};
		_.each(inputs, function(obj){
			var input = $(obj);
			params[input.attr("name")] = input.val();
		});
		$.ajax({
			url: "get_data",
			type: "GET",
			data: params,
			success: function(result){
				var count = 0;
				var final_events = [];
				var html = "";
				_.each(result, function(r){
					if(count < 5){
						html += '<div class="checkbox m5">\
                                <label> <input class="single_checkbox" type="checkbox" checked>'+r["name"]+'</label>\
                            </div>';
						final_events.push(result[count]);
					}else{
						html += '<div class="checkbox m5">\
                                <label> <input class="single_checkbox" type="checkbox">'+r["name"]+'</label>\
                            </div>';
					}
					count += 1;
				});
				event_comparison(final_events);
	        	$('.visual_container .event_checkbox').append(html);
	    	},
	    	beforeSend: function() {
				$('.main_container .loader').removeClass('hidden');
				$('.main_container .reports').addClass('hidden');
			},
			complete: function(){
				$('.main_container .loader').addClass('hidden');
				$('.main_container .reports').removeClass('hidden');
			},
		});
	});

	var limit = 5;
	$('document').on('change', '.single_checkbox', function(evt) {
		if($(this).siblings(':checked').length >= limit) {
			this.checked = false;
		}else{

		}
	});

	// manually trigger refresh button once. for page reload.
	$('.visual_container .button_refresh').click();
});


function setInputFromParams(){
	var params = getJsonFromUrl();

	// Date Range Picker
	var range_picker = $('.visual_container input[name="daterange"]');
	if(params.daterange==""){
		range_picker.data('daterangepicker').setStartDate(moment().subtract("month", 1).format("MM/DD/YYYY"));
		range_picker.data('daterangepicker').setEndDate(moment().format("MM/DD/YYYY"));
	}else{
		var range = params.daterange.split("-");
		range_picker.data('daterangepicker').setStartDate(moment(range[0].trim()).format("MM/DD/YYYY"));
		range_picker.data('daterangepicker').setEndDate(moment(range[1].trim()).format("MM/DD/YYYY"));
	}

	// Search Query
	$('.visual_container input[name="search"]').val(params.search);
}