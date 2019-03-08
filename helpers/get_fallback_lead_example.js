module.exports = () => {
	//TODO: right now this returns the same sample for all lead type triggers — we could customize the example data for different cases if desired
	return {
		"id": "1234",

		// Flattened contact fields
		"contact_id": "321654",
		"contact_remote_id": "",

		//TODO: we may want to make this contact_external_id? However we don't have this for leads, and this change will require bm repo changes
		"external_id": "14b3b88d36c625ba0c6334c511ccd34c",

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
	};
};