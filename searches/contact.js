module.exports = {
	key: 'contact',

	// You'll want to provide some helpful display labels and descriptions
	// for users. Zapier will put them into the UX.
	noun: 'Contact',
	display: {
		label: 'Find a Contact',
		description: 'Search for contacts.'
	},

	// `operation` is where we make the call to your API to do the search
	operation: {
		// This search only has one search field. Your searches might have just one, or many
		// search fields.
		inputFields: [

			{ key: 'id' },
			{ key: 'remote_id' },
			{ key: 'email' },
			{ key: 'company' },

		],

		perform: (z, bundle) => {
			const url = `https://${process.env.SUBDOMAIN}.envoke.com/v1/contacts`;

			// Put the search value in a query param. The details of how to build
			// a search URL will depend on how your API works.
			const options = {
				params: {}
			};

			[ 'id', 'remote_id', 'email', 'company', ].forEach((key) => {
				//TODO: allow searches for empty strings?
				bundle.inputData[key] && ( options.params[`filter[${key}]`] = bundle.inputData[key] );
			});

			return z.request(url, options).then(response => {

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

				return z.JSON.parse(response.content);
			});
		},

		sample: {
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
			],
		},

		/*
		outputFields: [

			{ key: "id", label: "id" },
			{ key: "remote_id", label: "remote_id" },
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

		]
		*/
	}
};