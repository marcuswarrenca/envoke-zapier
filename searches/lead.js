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

			{ key: 'id' },
			{ key: 'remote_id' },

			// Right now the only valid search fields are ids / email / company ... other fields may be worked with in create / update steps

			// { key: 'business_unit' },
			// { key: 'rule_rating' },
			// { key: 'marketing_rating_status', choices: [ "Not applicable", "Open", "Passed to sales", "Deferred", "Lead updated" ] },
			// { key: 'salesperson' },
			// { key: 'sales_rating_status', choices: [ "Not applicable", "Open", "Rated good", "Rated bad", "Contact attempted" ] },
			// { key: 'opportunity', choices: [ 'Yes', 'None', 'Cancelled' ] },
			// { key: 'sale', choices: [ 'Yes', 'None', 'Cancelled' ] },

			{ key: 'email' },
			{ key: 'contact_id' },
			{ key: 'contact_remote_id' },

			// { key: 'company' },

		],

		perform: (z, bundle) => {
			const url = `https://${process.env.SUBDOMAIN}.envoke.com/v1/leads`;

			// Put the search value in a query param. The details of how to build
			// a search URL will depend on how your API works.
			const options = {
				params: {}
			};

			[ 'id', 'remote_id', ].forEach((key) => {
				//TODO: allow searches for empty strings?
				bundle.inputData[key] && ( options.params[`filter[${key}]`] = bundle.inputData[key] );
			});

			[ 'email', 'contact_id', 'contact_remote_id', ].forEach((key) => {
				//TODO: allow searches for empty strings?
				bundle.inputData[key] && ( options.params[`filter[contact.${key}]`] = bundle.inputData[key] );
			});

			// Fatten the contact fields in the response
			return z.request(url, options).then(response => {
				const responseContent = z.JSON.parse(response.content);

				//TODO: refactor this into a helpers function...
				if ( response.status === 400 ) {
					if ( responseBody.result_data && responseBody.result_data.errors ) {
						throw new Error(responseBody.result_data.errors.join('\n'));
					} else {
						throw new Error(responseBody.result_text);
					}
				} else if ( response.status === 500 ) {
					z.console.log("Internal error from request: " + JSON.stringify(requestBody));
					throw new Error("Internal error from request: " + JSON.stringify(requestBody));
				}

				return responseContent.map((responseItem) => {

					const contactData = responseItem.contact;

					responseItem.contact_id = contactData.id;
					responseItem.contact_remote_id = contactData.remote_id;

					delete contactData.id;
					delete contactData.remote_id;
					delete responseItem.contact;

					return Object.assign(responseItem, contactData);
				});
			});
		},

		sample: {
			"id": "1234",

			// Flattened contact fields
			"contact_id": "321654",
			"contact_remote_id": "",
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
			],

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

		/*
		outputFields: [

			{ key: "id", label: "id" },

			{ key: "contact_id", label: "contact_id" },
			{ key: "contact_remote_id", label: "contact_remote_id" },
			{ key: "first_name", label: "first_name" },
			{ key: "last_name", label: "last_name" },
			{ key: "title", label: "title" },
			{ key: "email", label: "email" },
			{ key: "company", label: "company" },
			{ key: "phone", label: "phone" },
			{ key: "address_1", label: "address_1" },
			{ key: "address_2", label: "address_2" },
			{ key: "city", label: "city" },
			{ key: "country", label: "country" },
			{ key: "province", label: "province" },
			{ key: "postal_code", label: "postal_code" },
			{ key: "website", label: "website" },
			{ key: "language", label: "language" },
			{ key: "feedback", label: "feedback" },
			{ key: "consent_status", label: "consent_status" },
			{ key: "consent_description", label: "consent_description" },
			{ key: "custom_fields", label: "custom_fields" },
			{ key: "interests", label: "interests" },
			{ key: "autoresponders", label: "autoresponders" },

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
		*/
	}
};