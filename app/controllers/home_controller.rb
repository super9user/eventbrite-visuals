class HomeController < ActionController::Base

	def get_data
		search_query = build_search_query

		Eventbrite.token = "VZIUQHILAVSYG74CVFDN"
		results = Eventbrite::Event.search(search_query)
		p results.pagination.object_count
		arr = []
		results.events.each do |event|
			hash = {}
			hash['name'] = event["name"]["text"]
			start_date = event["start"]["utc"]
			end_date = event["end"]["utc"]
			start_date = Time.parse(start_date).beginning_of_day
			end_date = Time.parse(end_date).beginning_of_day

			start_timestamp = (start_date.to_f*1000).to_i
			end_timestamp = (end_date.to_f*1000).to_i
			hash["timestamp_values"] =[]
			hash["timestamp_values"] << start_timestamp
			while(end_timestamp - start_timestamp > 86400000)
				start_timestamp = start_timestamp + 86400000
				hash["timestamp_values"] << start_timestamp	
			end
			hash["timestamp_values"] << end_timestamp
			hash["capacity"] = event["capacity"]
			p hash["timestamp_values"]
			arr << hash
		end
		render json: arr
	end

	private
	def build_search_query
		search_query = {}
		if(params['daterange'].present?)
			start_date = params['daterange'].split("-")[0].strip
			end_date = params['daterange'].split("-")[1].strip

			start_date = Date.strptime(start_date, "%m/%d/%Y")
			end_date = Date.strptime(end_date, "%m/%d/%Y")

			search_query['start_date.range_start'] = start_date.strftime("%Y-%m-%dT%I:%M:%S")
			search_query['start_date.range_end'] = end_date.strftime("%Y-%m-%dT%I:%M:%S")
		end

		if(params['search'].present?)
			search_query['q'] = params['search'].strip
		end

		return search_query
	end

end