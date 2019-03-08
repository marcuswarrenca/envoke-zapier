module.exports = (z, bundle) => {
	// bundle.subscribeData contains the parsed response JSON from the subscribe
	// request made initially.
	const hookId = bundle.subscribeData.id;

	// You can build requests and our client will helpfully inject all the variables
	// you need to complete. You can also register middleware to control this.
	const options = {
		url: `https://${process.env.SUBDOMAIN}.envoke.com/v1/hooks/${hookId}`,
		method: 'DELETE',
	};

	// You may return a promise or a normal data structure from any perform method.
	return z.request(options)
		.then((response) => z.JSON.parse(response.content));
};