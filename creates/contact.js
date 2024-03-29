const ForOwn = require('lodash/forOwn');
const additionalFields = require('../helpers/additional_fields');

// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
	key: 'contact',

	// You'll want to provide some helpful display labels and descriptions
	// for users. Zapier will put them into the UX.
	noun: 'Contact',
	display: {
		label: 'Create Contact',
		description: 'Creates a new contact.',
		important: true
	},

	// `operation` is where the business logic goes.
	operation: {
		inputFields: [

			{ key: "email", required: true },

			{ key: "consent_status", required: true, choices: [ 'Express', 'Implied - Inquiry', 'Implied - Transaction', 'Implied - No Expiry', 'Not Provided', 'Revoked' ] },
			{ key: "consent_description", required: true },

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

			{ key: "interests", label: "Tags and subscriptions", list: true, dynamic: 'interestList.id.name' },
			{ key: "autoresponders", label: "Automated messages", list: true, dynamic: 'autoresponderList.id.name', helpText: "The contact must have a valid consent status (express / implied) in order to set automated messages" },

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
				url: `https://${process.env.SUBDOMAIN}.envoke.com/v1/contacts`,
				method: 'POST',
				body: JSON.stringify(requestBody),
			});

			// z.console.log(JSON.stringify(requestBody));

			return promise.then((response) => {

				const responseBody = z.JSON.parse(response.content);
				return responseBody.result_data;
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