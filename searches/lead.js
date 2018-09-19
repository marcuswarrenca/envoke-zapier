module.exports = {
	key: 'lead',

	// You'll want to provide some helpful display labels and descriptions
	// for users. Zapier will put them into the UX.
	noun: 'Lead',
	display: {
		label: 'Find a Lead',
		description: 'Search for leads.'
	},

	// `operation` is where we make the call to your API to do the search
	operation: {
		// This search only has one search field. Your searches might have just one, or many
		// search fields.
		inputFields: [


			//TODO: list all the fields we support searching for here...

			/*
			{
				key: 'style',
				type: 'string',
				label: 'Style',
				helpText: 'Cuisine style to limit to the search to (i.e. mediterranean or italian).'
			}
			*/

			{
				key: 'id',
				type: 'string',
				label: 'ID',
				helpText: 'The lead ID in Envoke'
			},
			{
				key: 'remote_id',
				type: 'string',
				label: 'remote_id',
				helpText: ''
			},
			{
				key: 'business_unit',
				type: 'string',
				label: 'business_unit',
				helpText: ''
			},
			{
				key: 'rule_rating',
				type: 'string',
				label: 'rule_rating',
				helpText: ''
			},
			{
				key: 'marketing_rating_status',
				type: 'string',
				label: 'marketing_rating_status',
				helpText: ''
			},
			{
				key: 'salesperson',
				type: 'string',
				label: 'salesperson',
				helpText: ''
			},
			{
				key: 'sales_rating_status',
				type: 'string',
				label: 'sales_rating_status',
				helpText: ''
			},
			{
				key: 'opportunity',
				type: 'string',
				label: 'opportunity',
				helpText: ''
			},
			{
				key: 'sale',
				type: 'string',
				label: 'sale',
				helpText: ''
			},

		],

		perform: (z, bundle) => {
			const url = 'https://e1d.envoke.com/v1/leads';

			// Put the search value in a query param. The details of how to build
			// a search URL will depend on how your API works.
			const options = {

				//TODO: review how these params will come out...
				params: {}
			};

			[ 'id', 'remote_id', 'business_unit', 'rule_rating', 'marketing_rating_status', 'salesperson', 'sales_rating_status', 'opportunity', 'sale', ].forEach((key) => {
				options.params[encodeURIComponent(`filter[$key]`)] = bundle.inputData[key];
			});

			return z.request(url, options)
				.then(response => JSON.parse(response.content));
		},

		sample: {
			"id": "1234",
			"contact": {
				"id": "321654",
				"remote_id": "",
				"first_name": "John",
				"last_name": "Purchase",
				"title": "Chief Architect",
				"email": "new-contact@api-testing.com",
				"company": "Art Vandelay Import/Exports",
				"phone": "647-987-1234",
				"address_1": "401 Richmond Street West",
				"address_2": "",
				"city": "Toronto",
				"country": "CA",
				"province": "ON",
				"postal_code": "M5V 5K7",
				"website": "",
				"language": "en",
				"feedback": "Hello. I'm interested in buying many of your widgets, please have someone contact me immediately!",
				"consent_status": "Express",
				"consent_description": "Lead is interested in receiving our widget updates",
				"custom_fields": {
					"widget_name": "Gold Deluxe Model 5X33"
				},
				"interests": [
					"Business Products",
					"International",
					"Consumer"
				],
				"autoresponders": [
					"Marketing Sequence 1",
					"Whitepaper Download"
				]
			},
			"business_unit": "B2B Widgets",
			"remote_id": "",
			"marketing_user": "Jane Manager",
			"salesperson": "Tom Salesman",
			"create_time": "2016-02-05 09:13:06",
			"create_note": "",
			"rule_rating": "Hot",
			"marketing_rating_status": "Passed to sales",
			"marketing_rating": "Hot",
			"marketing_rating_time": "2016-02-05 10:57:42",
			"marketing_rating_note": "This is a great lead! You should check it out",
			"sales_rating_status": "Rated good",
			"sales_rating": "Contacted: Good",
			"sales_rating_time": "2016-02-06 14:17:37",
			"sales_rating_note": "",
			"opportunity": "Yes",
			"opportunity_time": "2016-02-06 14:17:37",
			"opportunity_note": "They are interested in buying widgets",
			"sale": "Yes",
			"sale_time": "2016-02-08 11:43:27",
			"sale_note": "Purchased 6 widgets",
			"revenue": "7595.00",
			"cost_of_goods_sold": "6200.00",
			"lead_region": "North America",
			"sales_channel": "Consumer",
			"industry": "Telecommunications",
			"timing": "< 1 month",
			"budget": "$5000+",
			"marketing_source": "Google",
			"marketing_medium": "cpc",
			"marketing_campaign": "early-funnel-campaign",
			"visitor_id": "1434636651779",
			"visit_id": "1455028009329",
			"pageview_id": "1455032370950"
		},

		outputFields: [

			{ key: "id", label: "id" },
			{ key: "contact", label: "contact" },
			{ key: "business_unit", label: "business_unit" },
			{ key: "remote_id", label: "remote_id" },
			{ key: "marketing_user", label: "marketing_user" },
			{ key: "salesperson", label: "salesperson" },
			{ key: "create_time", label: "create_time" },
			{ key: "create_note", label: "create_note" },
			{ key: "rule_rating", label: "rule_rating" },
			{ key: "marketing_rating_status", label: "marketing_rating_status" },
			{ key: "marketing_rating", label: "marketing_rating" },
			{ key: "marketing_rating_time", label: "marketing_rating_time" },
			{ key: "marketing_rating_note", label: "marketing_rating_note" },
			{ key: "sales_rating_status", label: "sales_rating_status" },
			{ key: "sales_rating", label: "sales_rating" },
			{ key: "sales_rating_time", label: "sales_rating_time" },
			{ key: "sales_rating_note", label: "sales_rating_note" },
			{ key: "opportunity", label: "opportunity" },
			{ key: "opportunity_time", label: "opportunity_time" },
			{ key: "opportunity_note", label: "opportunity_note" },
			{ key: "sale", label: "sale" },
			{ key: "sale_time", label: "sale_time" },
			{ key: "sale_note", label: "sale_note" },
			{ key: "revenue", label: "revenue" },
			{ key: "cost_of_goods_sold", label: "cost_of_goods_sold" },
			{ key: "lead_region", label: "lead_region" },
			{ key: "sales_channel", label: "sales_channel" },
			{ key: "industry", label: "industry" },
			{ key: "timing", label: "timing" },
			{ key: "budget", label: "budget" },
			{ key: "marketing_source", label: "marketing_source" },
			{ key: "marketing_medium", label: "marketing_medium" },
			{ key: "marketing_campaign", label: "marketing_campaign" },
			{ key: "visitor_id", label: "visitor_id" },
			{ key: "visit_id", label: "visit_id" },
			{ key: "pageview_id", label: "pageview_id" },

		]
	}
};