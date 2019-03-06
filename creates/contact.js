const ForOwn = require('lodash/forOwn');

//TODO: create a module for this...
const additionalFields = (z, bundle) => {

	const request = z.request('https://e1.envoke.com/v1/customfields');

	// json is like [{"key":"field_1","label":"Label for Custom Field"}]
	return request.then(response => {

		const responseContent = z.JSON.parse(response.content);
		const outputFields = [];

		// z.console.log(responseContent);

		ForOwn(responseContent, (value, key) => {
			outputFields.push({ key: `custom_fields.${value}`, label: value });
		});

		// z.console.log(outputFields);

		return outputFields;
	});
};

// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
	key: 'contact',

	// You'll want to provide some helpful display labels and descriptions
	// for users. Zapier will put them into the UX.
	noun: 'Contact',
	display: {
		label: 'Create Contact',
		description: 'Creates a new contact.'
	},

	// `operation` is where the business logic goes.
	operation: {
		inputFields: [

			{ key: "email", required: true },

			{ key: "first_name" },
			{ key: "last_name" },

			{ key: "company" },
			{ key: "phone" },

			{ key: "remote_id" },

			{ key: "address_1" },
			{ key: "address_2" },
			{ key: "city" },
			{ key: "country" },
			{ key: "province" },
			{ key: "postal_code" },
			{ key: "website" },
			{ key: "title" },
			{ key: "language" },
			{ key: "feedback" },
			{ key: "consent_status", choices: [ 'Express', 'Implied - Inquiry', 'Implied - Transaction', 'Implied - No Expiry', 'Not Provided', 'Revoked', 'Envoke Spam Reported' ] },
			{ key: "consent_description" },

			{ key: "interests", list: true, dynamic: 'interestList.id.name' },
			{ key: "autoresponders", list: true, dynamic: 'autoresponderList.id.name' },

			additionalFields

		],

		perform: (z, bundle) => {

			const requestBody = bundle.inputData;

			const customFields = {};
			const interests = {};
			const autoresponders = {};

			ForOwn(requestBody, (value, key) => {

				if ( key.indexOf('custom_fields.') === -1 ) {

					switch ( key ) {

						case 'interests':
							value.forEach((interest) => {
								interests[interest] = 'set';
							});
							break;

						case 'autoresponders':
							value.forEach((autoresponder) => {
								autoresponders[autoresponder] = 'set';
							});
							break;
					}

				} else {

					const customFieldKey = key.split('custom_fields.')[1];
					customFields[customFieldKey] = value;

					delete requestBody[key];
				}

			});

			requestBody.custom_fields = customFields;
			requestBody.interests = interests;
			requestBody.autoresponders = autoresponders;

			const promise = z.request({
				url: 'https://e1.envoke.com/v1/contacts',
				method: 'POST',
				body: JSON.stringify(requestBody),
				headers: {
					'content-type': 'application/json',
				}
			});

			// z.console.log(JSON.stringify(requestBody));

			return promise.then((response) => {

				const responseBody = z.JSON.parse(response.content);

				if ( response.status === 400 ) {
					throw new Error(responseBody.result_text);
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

			{ key: "id",  },
			{ key: "remote_id",  },
			{ key: "first_name",  },
			{ key: "last_name",  },
			{ key: "title",  },
			{ key: "email",  },
			{ key: "company",  },
			{ key: "phone",  },
			{ key: "address_1",  },
			{ key: "address_2",  },
			{ key: "city",  },
			{ key: "country",  },
			{ key: "province",  },
			{ key: "postal_code",  },
			{ key: "website",  },
			{ key: "language",  },
			{ key: "feedback",  },
			{ key: "consent_status",  },
			{ key: "consent_description",  },

			// { key: "custom_fields",  },
			// { key: "interests",  },
			// { key: "autoresponders",  },

			additionalFields,

		]
		*/

	}
};