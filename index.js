
const authentication = require('./authentication');

const new_lead_trigger = require('./triggers/new_lead');
const passed_to_sales_trigger = require('./triggers/passed_to_sales');
const lead_update_trigger = require('./triggers/lead_update');
const new_opportunity_trigger = require('./triggers/new_opportunity');
const new_sale_trigger = require('./triggers/new_sale');
const submission_trigger = require('./triggers/submission');
const new_contact_trigger = require('./triggers/new_contact');
const form_submission_trigger = require('./triggers/form_submission');

const lead_search = require('./searches/lead');
const contact_search = require('./searches/contact');

const lead_create = require('./creates/lead');
const contact_create = require('./creates/contact');

// Add this helper function above the App definition
const addContentTypeToHeader = (request, z, bundle) => {
  request.headers['content-type'] = "application/json";
  return request;
};

const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  beforeRequest: [
    addContentTypeToHeader
  ],

  afterResponse: [
  ],

  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
	  [new_lead_trigger.key]: new_lead_trigger,
    [passed_to_sales_trigger.key]: passed_to_sales_trigger,
    [lead_update_trigger.key]: lead_update_trigger,
    [new_opportunity_trigger.key]: new_opportunity_trigger,
    [new_sale_trigger.key]: new_sale_trigger,
    [submission_trigger.key]: submission_trigger,
    [new_contact_trigger.key]: new_contact_trigger,
    [form_submission_trigger.key]: form_submission_trigger,
  },

  // If you want your searches to show up, you better include it here!
  searches: {
		[lead_search.key]: lead_search,
		[contact_search.key]: contact_search,
  },

  // If you want your creates to show up, you better include it here!
  creates: {
		[lead_create.key]: lead_create,
		[contact_create.key]: contact_create,
  }
};

// Finally, export the app.
module.exports = App;
