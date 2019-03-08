module.exports = (type) => {
	return (z, bundle) => {
		// `z.console.log()` is similar to `console.log()`.
		// z.console.log('console says hello world!');

		// bundle.targetUrl has the Hook URL this app should call when a recipe is created.
		const data = {
			url: bundle.targetUrl,
			type: type,

			//TODO: include optional properties here to filter by
			//style: bundle.inputData.style
		};

		// You can build requests and our client will helpfully inject all the variables
		// you need to complete. You can also register middleware to control this.
		const options = {
			url: `https://${process.env.SUBDOMAIN}.envoke.com/v1/hooks`,
			method: 'POST',
			body: JSON.stringify(data)
		};

		// You may return a promise or a normal data structure from any perform method.
		return z.request(options)
			.then((response) => z.JSON.parse(response.content));
	};
};