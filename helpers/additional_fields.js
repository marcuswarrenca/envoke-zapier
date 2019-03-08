const ForOwn = require('lodash/forOwn');

module.exports = (z, bundle) => {

	const request = z.request(`https://${process.env.SUBDOMAIN}.envoke.com/v1/customfields`);
	// json is like [{"key":"field_1","label":"Label for Custom Field"}]

	return request.then(response => {

		const responseContent = z.JSON.parse(response.content);
		const outputFields = [];

		ForOwn(responseContent, (value, key) => {
			outputFields.push({ key: `custom_fields.${value}`, label: value });
		});

		return outputFields;
	});
};