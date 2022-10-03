const ForOwn = require('lodash/forOwn');

const authentication = require('./authentication');

//TODO: consent change trigger, manual, import etc (?)
const new_contact_trigger = require('./triggers/new_contact');
const form_submission_trigger = require('./triggers/form_submission');
// const new_lead_trigger = require('./triggers/new_lead');
// const passed_to_sales_trigger = require('./triggers/passed_to_sales');
// const lead_update_trigger = require('./triggers/lead_update');
// const new_opportunity_trigger = require('./triggers/new_opportunity');
// const new_sale_trigger = require('./triggers/new_sale');
// const submission_trigger = require('./triggers/submission');

const contact_search = require('./searches/contact');
// const lead_search = require('./searches/lead');

const contact_create = require('./creates/contact');
const contact_update = require('./creates/update_contact');
// const lead_create = require('./creates/lead');
// const lead_update = require('./creates/update_lead');

// Add this helper function above the App definition
const includeBearerToken = (request, z, bundle) => {
	if ( bundle.authData.access_token ) {
		request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
	}
	return request;
};

const addContentTypeToHeader = (request, z, bundle) => {
  request.headers['content-type'] = "application/json";
  return request;
};

const handleErrors = (response, z) => {
	const responseBody = z.JSON.parse(response.content);

	if ( response.status === 400 ) {

		if ( responseBody.result_data && responseBody.result_data.errors ) {
			throw new z.errors.Error(responseBody.result_data.errors.join('\n'));
		} else {
			throw new z.errors.Error(responseBody.result_text);
		}

	} else if ( response.status === 500 ) {
		z.console.log("Internal error from request: " + JSON.stringify(requestBody));
		throw new z.errors.Error("Internal error from request: " + JSON.stringify(requestBody));

	} else {

		//TODO: this would be unexpected... I guess we should log something here?
		// As far as I know our server only returns 400 / 500 status
	}

	return response;
};

const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  beforeRequest: [
	  includeBearerToken, addContentTypeToHeader
  ],

  afterResponse: [
	  handleErrors
  ],

  resources: {

		interest: {
			key: 'interest',
			noun: 'Interest',
			list: {
				display: {
					hidden: true,
					label: 'List of Interests',
					description: 'Select from the list of interests'
				},

				operation: {
					perform: (z, bundle) => {
						const request = z.request(`https://${process.env.SUBDOMAIN}.envoke.com/v1/interests`);

						return request.then(response => {
							const responseContent = z.JSON.parse(response.content);
							const outputFields = [];

							ForOwn(responseContent, (value, key) => {
								outputFields.push({ id: key, name: value });
							});

							return outputFields;
						});
					}
				},
			}
		},

	  //TODO: update to "automated messages" / email client terminology
		autoresponder: {
			key: 'autoresponder',
			noun: 'Nurture Campaign',
			list: {
				display: {
					hidden: true,
					label: 'List of Nuture Campaigns',
					description: 'Select from the list of nurture campaigns'
				},

				operation: {

					//TODO: refactor this since it's the same as above for interests
					perform: (z, bundle) => {
						const request = z.request(`https://${process.env.SUBDOMAIN}.envoke.com/v1/autoresponders`);

						return request.then(response => {
							const responseContent = z.JSON.parse(response.content);
							const outputFields = [];

							ForOwn(responseContent, (value, key) => {
								outputFields.push({ id: key, name: value });
							});

							return outputFields;
						});
					}
				},
			}
		},

  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
	  [new_contact_trigger.key]: new_contact_trigger,
	  [form_submission_trigger.key]: form_submission_trigger,

	  // [new_lead_trigger.key]: new_lead_trigger,
    // [passed_to_sales_trigger.key]: passed_to_sales_trigger,
    // [lead_update_trigger.key]: lead_update_trigger,

    // [new_opportunity_trigger.key]: new_opportunity_trigger,
    // [new_sale_trigger.key]: new_sale_trigger,
    // [submission_trigger.key]: submission_trigger,
  },

  // If you want your searches to show up, you better include it here!
  searches: {
		[contact_search.key]: contact_search,
	  // [lead_search.key]: lead_search,
  },

  // If you want your creates to show up, you better include it here!
  creates: {
		[contact_create.key]: contact_create,
    [contact_update.key]: contact_update,

	  // [lead_create.key]: lead_create,
	  // [lead_update.key]: lead_update,
  },


	searchOrCreates: {
		[contact_search.key]: { // the key must match the search
			key: contact_search.key, // same as above
			display: {
				// the label goes up in sidebar
				// see: https://cdn.zapier.com/storage/photos/04f7951bda0c43dc80eb630251724336.png
				label: 'Find or create a contact',
				description: 'Find or create a contact' // this is ignored
			},
			search: contact_search.key,
			create: contact_create.key
		},
		/*
		[lead_search.key]: { // the key must match the search
			key: lead_search.key, // same as above
			display: {
				// the label goes up in sidebar
				// see: https://cdn.zapier.com/storage/photos/04f7951bda0c43dc80eb630251724336.png
				label: 'Find or create a lead',
				description: 'Find or create a lead' // this is ignored
			},
			search: lead_search.key,
			create: lead_create.key
		},
		*/
	},


};

// Finally, export the app.
module.exports = App;
