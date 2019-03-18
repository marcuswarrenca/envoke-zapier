const ForOwn = require('lodash/forOwn');
const additionalFields = require('../helpers/additional_fields');

// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
	key: 'update_lead',

	// You'll want to provide some helpful display labels and descriptions
	// for users. Zapier will put them into the UX.
	noun: 'Lead',
	display: {
		label: 'Update Lead',
		description: 'Updates a lead.'
	},

	// `operation` is where the business logic goes.
	operation: {
		inputFields: [

			{ key: "id", helpText: "The Lead ID (required to update)", required: true },
			

			// { key: "business_unit" },
			{ key: "remote_id" },
			{ key: "marketing_user" },
			{ key: "salesperson" },
			// { key: "create_time" },
			{ key: "create_note" },
			{ key: "rule_rating" },
			{ key: "marketing_rating_status", choices: [ "Not applicable", "Open", "Passed to sales", "Deferred", "Lead updated" ] },
			{ key: "marketing_rating" },
			// { key: "marketing_rating_time" },
			{ key: "marketing_rating_note" },
			{ key: "sales_rating_status", choices: [ "Not applicable", "Open", "Rated good", "Rated bad", "Contact attempted" ] },
			{ key: "sales_rating" },
			// { key: "sales_rating_time" },
			{ key: "sales_rating_note" },
			{ key: "opportunity", choices: [ 'Yes', 'None', 'Cancelled' ]  },
			// { key: "opportunity_time" },
			{ key: "opportunity_note" },


			//TODO: an example of dynamic fields... for example we could show opportunity_note only if opportunity has been set or cancelled
			/*
			{
				key: 'type',
				required: true,
				choices: { 1: 'cake', 2: 'ice cream', 3: 'cookie' },
				altersDynamicFields: true
			},
			function(z, bundle) {
				if (bundle.inputData.type === '2') {
					return [{ key: 'with_sprinkles', type: 'boolean' }];
				}
				return [];
			},
			*/


			{ key: "sale", choices: [ 'Yes', 'None', 'Cancelled' ]  },
			// { key: "sale_time" },
			{ key: "sale_note" },
			{ key: "revenue" },
			{ key: "cost_of_goods_sold" },
			// { key: "lead_region" },
			// { key: "sales_channel" },
			// { key: "industry" },
			// { key: "timing" },
			// { key: "budget" },
			{ key: "marketing_source" },
			{ key: "marketing_medium" },
			{ key: "marketing_campaign" },
			{ key: "visitor_id" },
			{ key: "visit_id" },
			{ key: "pageview_id" },
			
			//TODO: some of these should not be allowed? For instance not allowed to change contact from a lead update request?
			// { key: "contact_id" },

			{ key: "email" },

			{ key: "consent_status", choices: [ 'Express', 'Implied - Inquiry', 'Implied - Transaction', 'Implied - No Expiry', 'Not Provided', 'Revoked' ] },
			{ key: "consent_description" },

			{ key: "first_name" },
			{ key: "last_name" },

			{ key: "company" },
			{ key: "phone" },

			{ key: "contact_remote_id" },

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

			additionalFields

		],

		perform: (z, bundle) => {

			const requestBody = bundle.inputData;
			requestBody.contact = {};

			// Un-flatten the contact fields into the nested contact object for the leads API
			[
				"contact_id",
				"contact_remote_id",
				"first_name",
				"last_name",
				"title",
				"email",
				"company",
				"phone",
				"address_1",
				"address_2",
				"city",
				"country",
				"province",
				"postal_code",
				"website",
				"language",
				"feedback",
				"consent_status",
				"consent_description",


				"custom_fields",
				"interests",
				"autoresponders",


			].forEach((contactField) => {

				switch ( contactField ) {

					case 'contact_id':
						bundle.inputData[contactField] && ( requestBody.contact['id'] = bundle.inputData[contactField] );
						break;
					case 'contact_remote_id':
						bundle.inputData[contactField] && ( requestBody.contact['remote_id'] = bundle.inputData[contactField] );
						break;

					default:
						//TODO: support passing through empty strings?
						bundle.inputData[contactField] && ( requestBody.contact[contactField] = bundle.inputData[contactField] );
						break;
				}
			});


			


			const customFields = {};
			const interests = {};
			const autoresponders = {};

			ForOwn(requestBody, (value, key) => {

				if ( key.indexOf('custom_fields.') === -1 ) {

				} else {

					const customFieldKey = key.split('custom_fields.')[1];
					customFields[customFieldKey] = value;

					delete requestBody[key];
				}
			});


			ForOwn(requestBody.contact, (value, key) => {

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

			});


			requestBody.contact.custom_fields = customFields;
			requestBody.contact.interests = interests;
			requestBody.contact.autoresponders = autoresponders;
			
			
			
			


			const promise = z.request({
				url: `https://${process.env.SUBDOMAIN}.envoke.com/v1/leads`,
				method: 'PATCH',
				body: JSON.stringify(requestBody),
				headers: {
					'content-type': 'application/json',
				}
			});

			//TODO: flatten the contact fields in response.content.result_data
			return promise.then((response) => {

				const responseBody = z.JSON.parse(response.content);

				if ( response.status === 400 ) {
					throw new Error(responseBody.result_text);
				} else if ( response.status === 500 ) {
					z.console.log("Internal error from request: " + JSON.stringify(requestBody));
					throw new Error("Internal error from request: " + JSON.stringify(requestBody));
				}

				return responseBody;
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

			{ key: "id" },

			{ key: "contact_id" },
			{ key: "contact_remote_id" },
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

			{ key: "business_unit" },
			{ key: "remote_id" },
			{ key: "marketing_user" },
			{ key: "salesperson" },
			{ key: "create_time" },
			{ key: "create_note" },
			{ key: "rule_rating" },
			{ key: "marketing_rating_status" },
			{ key: "marketing_rating" },
			{ key: "marketing_rating_time" },
			{ key: "marketing_rating_note" },
			{ key: "sales_rating_status" },
			{ key: "sales_rating" },
			{ key: "sales_rating_time" },
			{ key: "sales_rating_note" },
			{ key: "opportunity" },
			{ key: "opportunity_time" },
			{ key: "opportunity_note" },
			{ key: "sale" },
			{ key: "sale_time" },
			{ key: "sale_note" },
			{ key: "revenue" },
			{ key: "cost_of_goods_sold" },
			{ key: "lead_region" },
			{ key: "sales_channel" },
			{ key: "industry" },
			{ key: "timing" },
			{ key: "budget" },
			{ key: "marketing_source" },
			{ key: "marketing_medium" },
			{ key: "marketing_campaign" },
			{ key: "visitor_id" },
			{ key: "visit_id" },
			{ key: "pageview_id" },

		]
		*/

	}
};