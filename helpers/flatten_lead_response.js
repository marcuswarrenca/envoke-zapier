const ForOwn = require('lodash/forOwn');

module.exports = (responseData) => {
	ForOwn(responseData.contact, (value, key) => {

		switch ( key ) {

			case 'id':
			case 'remote_id':
				// case 'external_id':
				responseData[`contact_${key}`] = value;
				break;
			default:
				responseData[key] = value;
				break;
		}
	});

	delete responseData.contact;
	return responseData;
};