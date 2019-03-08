const ForOwn = require('lodash/forOwn');
const additionalFields = require('../helpers/additional_fields');


// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
	key: 'update_contact',

	// You'll want to provide some helpful display labels and descriptions
	// for users. Zapier will put them into the UX.
	noun: 'Contact',
	display: {
		label: 'Update Contact',
		description: 'Updates a contact.'
	},

	// `operation` is where the business logic goes.
	operation: {
		inputFields: [

			{ key: "id", helpText: "One of ID / Email is required to update a contact" },
			{ key: "email", helpText: "One of ID / Email is required to update a contact" },

			{ key: "consent_status", choices: [ 'Express', 'Implied - Inquiry', 'Implied - Transaction', 'Implied - No Expiry', 'Not Provided', 'Revoked' ] },
			{ key: "consent_description" },

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

			{ key: "interests", list: true, dynamic: 'interestList.id.name' },
			{ key: "autoresponders", label: "Nurture campaigns", list: true, dynamic: 'autoresponderList.id.name', helpText: "The contact must have a valid consent status (express / implied) in order to set nurture campaigns" },
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
				method: 'PATCH',
				body: JSON.stringify(requestBody),
				headers: {
					'content-type': 'application/json',
				}
			});

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

			{ key: "id" },
			{ key: "remote_id" },
			{ key: "first_name" },
			{ key: "last_name" },
			{ key: "title" },
			{ key: "email" },
			{ key: "company" },
			{ key: "phone" },
			{ key: "address_1" },
			{ key: "address_2" },
			{ key: "city" },
			{ key: "country" },
			{ key: "province" },
			{ key: "postal_code" },
			{ key: "website" },
			{ key: "language" },
			{ key: "feedback" },
			{ key: "consent_status" },
			{ key: "consent_description" },
			{ key: "custom_fields" },
			{ key: "interests" },
			{ key: "autoresponders" },

		]
		*/

	}
};