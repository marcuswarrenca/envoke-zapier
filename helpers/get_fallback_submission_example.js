module.exports = (z, bundle) => {

	//TODO: we don't currently have a way to GET a real "submission" record data through the Envoke API
	// It's generated at the time of the event and not publicly accessible afterwards
	// So for now we'll use this example to demonstrate the data structure and example values for all the fields

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
};