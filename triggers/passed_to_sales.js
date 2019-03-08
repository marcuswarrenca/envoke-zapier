const subscribeHook = require('../helpers/subscribe_hook');
const unsubscribeHook = require('../helpers/unsubscribe_hook');
const flattenLeadResponse = require('../helpers/flatten_lead_response');
const getFallbackLeadExample = require('../helpers/get_fallback_lead_example');

const get = (z, bundle) => {
	return flattenLeadResponse(bundle.cleanedRequest);
};

const getFallbackReal = (z, bundle) => {
	// For the test poll, you should get some real data, to aid the setup process.
	const options = {
		url: `https://${process.env.SUBDOMAIN}.envoke.com/v1/leads?filter%5Bmarketing_rating_status%5D=passed%20to%20sales&sort%5Bid%5D=DESC`,
	};

	return z.request(options)
		.then((response) => z.JSON.parse(response.content));
};

// We recommend writing your triggers separate like this and rolling them
// into the App definition at the end.
module.exports = {
	key: 'passed_to_sales',

	// You'll want to provide some helpful display labels and descriptions
	// for users. Zapier will put them into the UX.
	noun: 'Passed to sales',
	display: {
		label: 'Passed to Sales',
		description: 'Trigger when a lead is passed to sales.'
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

		performSubscribe: subscribeHook('passed_to_sales'),
		performUnsubscribe: unsubscribeHook,

		perform: get,
		performList: getFallbackReal,

		// In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
		// from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
		// returned records, and have obviously dummy values that we can show to any user.
		sample: getFallbackLeadExample(),

		// If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
		// field definitions. The result will be used to augment the sample.
		// outputFields: () => { return []; }
		// Alternatively, a static field definition should be provided, to specify labels for the fields
		/*
		outputFields: [

			{ key: "id", label: "id" },

			{ key: "contact_id", label: "contact_id" },
			{ key: "contact_remote_id", label: "contact_remote_id" },

			//TODO: we may want to make this contact_external_id? However we don't have this for leads, and this change will require bm repo changes
			{ key: "external_id", label: "external_id" },

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