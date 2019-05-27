const subscribeHook = require('../helpers/subscribe_hook');
const unsubscribeHook = require('../helpers/unsubscribe_hook');
const getFallbackContactExample = require('../helpers/get_fallback_contact_example');

const get = (z, bundle) => {
	return bundle.cleanedRequest;
};

const getFallbackReal = (z, bundle) => {
	// For the test poll, you should get some real data, to aid the setup process.
	const options = {
		url: `https://${process.env.SUBDOMAIN}.envoke.com/v1/contacts?sort%5Bid%5D=DESC`,
	};

	return z.request(options).then((response) => z.JSON.parse(response.content));
};

// We recommend writing your triggers separate like this and rolling them
// into the App definition at the end.
module.exports = {
	key: 'new_contact',

	// You'll want to provide some helpful display labels and descriptions
	// for users. Zapier will put them into the UX.
	noun: 'Contact',
	display: {
		label: 'New Contact',
		description: 'Trigger a new contact is added.',
		important: true
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

		performSubscribe: subscribeHook('new_contact'),
		performUnsubscribe: unsubscribeHook,

		perform: get,
		performList: getFallbackReal,

		// In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
		// from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
		// returned records, and have obviously dummy values that we can show to any user.

		sample: getFallbackContactExample(),

		// If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
		// field definitions. The result will be used to augment the sample.
		// outputFields: () => { return []; }
		// Alternatively, a static field definition should be provided, to specify labels for the fields
		/*
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
		*/
	}
};