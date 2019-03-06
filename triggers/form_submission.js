const subscribeHook = (z, bundle) => {
	// `z.console.log()` is similar to `console.log()`.

	// z.console.log('console says hello world!');

	// bundle.targetUrl has the Hook URL this app should call when a recipe is created.
	const data = {
		url: bundle.targetUrl,
		type: 'form_submission',

		//TODO: include optional properties here to filter by
		//style: bundle.inputData.style
	};

	// You can build requests and our client will helpfully inject all the variables
	// you need to complete. You can also register middleware to control this.
	const options = {
		url: 'https://e1.envoke.com/v1/hooks',
		method: 'POST',
		body: JSON.stringify(data)
	};

	// You may return a promise or a normal data structure from any perform method.
	return z.request(options)
		.then((response) => z.JSON.parse(response.content));
};

const unsubscribeHook = (z, bundle) => {
	// bundle.subscribeData contains the parsed response JSON from the subscribe
	// request made initially.
	const hookId = bundle.subscribeData.id;

	// You can build requests and our client will helpfully inject all the variables
	// you need to complete. You can also register middleware to control this.
	const options = {
		url: `https://e1.envoke.com/v1/hooks/${hookId}`,
		method: 'DELETE',
	};

	// You may return a promise or a normal data structure from any perform method.
	return z.request(options)
		.then((response) => z.JSON.parse(response.content));
};

const get = (z, bundle) => {
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

const getFallbackReal = (z, bundle) => {

	//TODO: we don't currently have any way to expose real "submission" record data through the API, so just returning this example here
	//TODO: maybe we don't even need to do this? Zapier will just use the sample defined below?
	// For the test poll, you should get some real data, to aid the setup process.

	return [
		{
			"id": "1234",
			"contact_id": "22345",
			"contact_external_id": "12345678901234567890123456789012",
			"contact_remote_id": "",
			"contact_created": true,
			"lead_id": "1234",
			"lead_remote_id": "",
			"submission_time": "2016-02-05T09:13:06+00:00",
			"submission_type": "form",
			"submission_user": "",
			"form_name": "Widget Request Form",
			"form_url": "https://www.widgets.com/getsome",
			"first_name": "John",
			"last_name": "Johnson",
			"title": "Leading Leader",
			"email": "new-contact@api-testing.com",
			"company": "Envoke",
			"phone": "555-1234",
			"address_1": "555 Brant Street",
			"address_2": "",
			"city": "Toronto",
			"country": "CA",
			"province": "ON",
			"postal_code": "L1V 3X5",
			"website": "",
			"language": "en",
			"feedback": "",
			"consent_status": "Express",
			"consent_description": "Express consent given on website homepage form.",
			"consent_effective_date": "2017-10-27T18:19:57+00:00",
			"consent_expiry": "",
			"marketing_source": "Google",
			"marketing_medium": "cpc",
			"marketing_campaign": "early-funnel-campaign",
			"visitor_id": "1434636651779",
			"visit_id": "1455028009329",
			"pageview_id": "1455032370950",
			"custom_fields": {
				"custom_field_name1": "Field Value 1"
			},
			"interests": [
				{"id": "1234", "name": "Consumer", "state": "Set"},
				{"id": "1235", "name": "International", "state": "Set"},
				{"id": "1236", "name": "Business Products", "state": "Unset"}
			],
			"subscriptions": [
				{"id": "2237", "name": "Newsletter", "state": "Set"},
				{"id": "2238", "name": "Special offers", "state": "Set"}
			],
			"autoresponders": [
				{"id": "3238", "name": "Marketing Sequence 1", "state": "Set"},
				{"id": "3239", "name": "Whitepaper Download", "state": "Set"}
			],
			"events": [
				{"id": "4240", "name": "introduction course", "state": "Fulfilled"},
				{"id": "4241", "name": "advanced course", "state": "Confirmed"}
			],
			"webinars": [
				{"id": "5242", "name": "widget demo", "state": "Assigned"},
				{"id": "5243", "name": "learn about widgets", "state": "Canceled"}
			],
			"downloads": [
				{"id": "6244", "name": "abc widget", "state": "Fulfilled"},
				{"id": "6245", "name": "widgets ebook", "state": "Fulfilled"}
			],
			"qualification_questions": {
				"business_unit": "B2B Widgets",
				"lead_region": "North America",
				"sales_channel": "Consumer",
				"industry": "Telecommunications",
				"timing": "< 1 month",
				"budget": "$5000+"
			}
		}
	];


	/*
	const options = {

		//TODO: ...
		url: 'https://e1.envoke.com/v1/leads?filter%5Bmarketing_rating_status%5D=passed%20to%20sales',

		params: {
			style: bundle.inputData.style
		}
	};

	return z.request(options)
		.then((response) => JSON.parse(response.content));
	*/
};

// We recommend writing your triggers separate like this and rolling them
// into the App definition at the end.
module.exports = {
	key: 'form_submission',

	// You'll want to provide some helpful display labels and descriptions
	// for users. Zapier will put them into the UX.
	noun: 'Form Submission',
	display: {
		label: 'Form Submission',
		description: 'Trigger for all form submissions to Envoke.'
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

		perform: get,
		performList: getFallbackReal,

		// In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
		// from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
		// returned records, and have obviously dummy values that we can show to any user.
		sample: {
			"id": "1234",
			"contact_id": "22345",
			"contact_external_id": "12345678901234567890123456789012",
			"contact_remote_id": "",
			"contact_created": true,
			"lead_id": "1234",
			"lead_remote_id": "",
			"submission_time": "2016-02-05T09:13:06+00:00",
			"submission_type": "form",
			"submission_user": "",
			"form_name": "Widget Request Form",
			"form_url": "https://www.widgets.com/getsome",
			"first_name": "John",
			"last_name": "Johnson",
			"title": "Leading Leader",
			"email": "new-contact@api-testing.com",
			"company": "Envoke",
			"phone": "555-1234",
			"address_1": "555 Brant Street",
			"address_2": "",
			"city": "Toronto",
			"country": "CA",
			"province": "ON",
			"postal_code": "L1V 3X5",
			"website": "",
			"language": "en",
			"feedback": "",
			"consent_status": "Express",
			"consent_description": "Express consent given on website homepage form.",
			"consent_effective_date": "2017-10-27T18:19:57+00:00",
			"consent_expiry": "",
			"marketing_source": "Google",
			"marketing_medium": "cpc",
			"marketing_campaign": "early-funnel-campaign",
			"visitor_id": "1434636651779",
			"visit_id": "1455028009329",
			"pageview_id": "1455032370950",
			"custom_fields": {
				"custom_field_name1": "Field Value 1"
			},
			"interests": [
				{"id": "1234", "name": "Consumer", "state": "Set"},
				{"id": "1235", "name": "International", "state": "Set"},
				{"id": "1236", "name": "Business Products", "state": "Unset"}
			],
			"subscriptions": [
				{"id": "2237", "name": "Newsletter", "state": "Set"},
				{"id": "2238", "name": "Special offers", "state": "Set"}
			],
			"autoresponders": [
				{"id": "3238", "name": "Marketing Sequence 1", "state": "Set"},
				{"id": "3239", "name": "Whitepaper Download", "state": "Set"}
			],
			"events": [
				{"id": "4240", "name": "introduction course", "state": "Fulfilled"},
				{"id": "4241", "name": "advanced course", "state": "Confirmed"}
			],
			"webinars": [
				{"id": "5242", "name": "widget demo", "state": "Assigned"},
				{"id": "5243", "name": "learn about widgets", "state": "Canceled"}
			],
			"downloads": [
				{"id": "6244", "name": "abc widget", "state": "Fulfilled"},
				{"id": "6245", "name": "widgets ebook", "state": "Fulfilled"}
			],
			"qualification_questions": {
				"business_unit": "B2B Widgets",
				"lead_region": "North America",
				"sales_channel": "Consumer",
				"industry": "Telecommunications",
				"timing": "< 1 month",
				"budget": "$5000+"
			}
		},

		// If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
		// field definitions. The result will be used to augment the sample.
		// outputFields: () => { return []; }
		// Alternatively, a static field definition should be provided, to specify labels for the fields
		outputFields: [

			{ key: "id", label: "id" },
			{ key: "contact_id", label: "contact_id" },
			{ key: "contact_external_id", label: "contact_external_id" },
			{ key: "contact_remote_id", label: "contact_remote_id" },
			{ key: "contact_created", label: "contact_created" },
			{ key: "lead_id", label: "lead_id" },
			{ key: "lead_remote_id", label: "lead_remote_id" },
			{ key: "submission_time", label: "submission_time" },
			{ key: "submission_type", label: "submission_type" },
			{ key: "submission_user", label: "submission_user" },
			{ key: "form_name", label: "form_name" },
			{ key: "form_url", label: "form_url" },
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
			{ key: "consent_effective_date", label: "consent_effective_date" },
			{ key: "consent_expiry", label: "consent_expiry" },
			{ key: "marketing_source", label: "marketing_source" },
			{ key: "marketing_medium", label: "marketing_medium" },
			{ key: "marketing_campaign", label: "marketing_campaign" },
			{ key: "visitor_id", label: "visitor_id" },
			{ key: "visit_id", label: "visit_id" },
			{ key: "pageview_id", label: "pageview_id" },
			{ key: "custom_fields", label: "custom_fields" },
			{ key: "interests", label: "interests" },
			{ key: "subscriptions", label: "subscriptions" },
			{ key: "autoresponders", label: "autoresponders" },
			{ key: "events", label: "events" },
			{ key: "webinars", label: "webinars" },
			{ key: "downloads", label: "downloads" },
			{ key: "qualification_questions", label: "qualification_questions" },

		]
	}
};