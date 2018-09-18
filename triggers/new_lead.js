const subscribeHook = (z, bundle) => {
	// `z.console.log()` is similar to `console.log()`.
	z.console.log('console says hello world!');

	// bundle.targetUrl has the Hook URL this app should call when a recipe is created.
	const data = {
		url: bundle.targetUrl,

		//TODO: include optional properties here to filter by
		//style: bundle.inputData.style
	};

	// You can build requests and our client will helpfully inject all the variables
	// you need to complete. You can also register middleware to control this.
	const options = {
		url: 'https://e1d.envoke.com/hooks',
		method: 'POST',
		body: JSON.stringify(data)
	};

	// You may return a promise or a normal data structure from any perform method.
	return z.request(options)
		.then((response) => JSON.parse(response.content));
};

const unsubscribeHook = (z, bundle) => {
	// bundle.subscribeData contains the parsed response JSON from the subscribe
	// request made initially.
	const hookId = bundle.subscribeData.id;

	// You can build requests and our client will helpfully inject all the variables
	// you need to complete. You can also register middleware to control this.
	const options = {
		url: `https://e1d.envoke.com/hooks/${hookId}`,
		method: 'DELETE',
	};

	// You may return a promise or a normal data structure from any perform method.
	return z.request(options)
		.then((response) => JSON.parse(response.content));
};

const getRecipe = (z, bundle) => {
	// bundle.cleanedRequest will include the parsed JSON object (if it's not a
	// test poll) and also a .querystring property with the URL's query string.

	//TODO: is there anything we need to do here?
	/*
	const recipe = {
		id: bundle.cleanedRequest.id,
		name: bundle.cleanedRequest.name,
		directions: bundle.cleanedRequest.directions,
		style: bundle.cleanedRequest.style,
		authorId: bundle.cleanedRequest.authorId,
		createdAt: bundle.cleanedRequest.createdAt
	};

	return [recipe];
	*/

	return bundle.cleanedRequest;
};

const getFallbackRealRecipe = (z, bundle) => {
	// For the test poll, you should get some real data, to aid the setup process.
	const options = {
		url: 'https://e1d.envoke.com/v1/leads',
		/*
		params: {
			style: bundle.inputData.style
		}
		*/
	};

	return z.request(options)
		.then((response) => JSON.parse(response.content));
};

// We recommend writing your triggers separate like this and rolling them
// into the App definition at the end.
module.exports = {
	key: 'new_lead',

	// You'll want to provide some helpful display labels and descriptions
	// for users. Zapier will put them into the UX.
	noun: 'Lead',
	display: {
		label: 'New Lead',
		description: 'Trigger when a new lead is added.'
	},

	// `operation` is where the business logic goes.
	operation: {

		// `inputFields` can define the fields a user could provide,
		// we'll pass them in as `bundle.inputData` later.
		inputFields: [
			/*
			{ key: 'style', type: 'string', helpText: 'Which styles of cuisine this should trigger on.' }
			*/
		],

		type: 'hook',

		performSubscribe: subscribeHook,
		performUnsubscribe: unsubscribeHook,

		perform: getRecipe,
		performList: getFallbackRealRecipe,

		// In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
		// from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
		// returned records, and have obviously dummy values that we can show to any user.
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

		// If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
		// field definitions. The result will be used to augment the sample.
		// outputFields: () => { return []; }
		// Alternatively, a static field definition should be provided, to specify labels for the fields
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