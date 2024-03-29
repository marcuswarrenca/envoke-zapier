const getAccessToken = async (z, bundle) => {
  const response = await z.request({
    url: `https://${process.env.SUBDOMAIN}.envoke.com/ext/oauth/access_token`,
    method: 'POST',
    body: {
      //TODO: incredibly, the order of these parameters appears to matter...
      grant_type: 'authorization_code',
      code: bundle.inputData.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,

      //TODO: this shouldn't be necessary...
      // redirect_uri: `https://${process.env.SUBDOMAIN}.envoke.com/oauth/tokens`,

      redirect_uri: bundle.inputData.redirect_uri,

      // Extra data can be pulled from the querystring. For instance:
      // 'accountDomain': bundle.cleanedRequest.querystring.accountDomain
    },
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  });

  // If you're using core v9.x or older, you should call response.throwForStatus()
  // or verify response.status === 200 before you continue.

  // z.console.log("Trying to get access token...");
  // z.console.log(response);

  // This function should return `access_token`.
  // If your app does an app refresh, then `refresh_token` should be returned here
  // as well
  return {
    access_token: response.data.access_token,
    // refresh_token: response.data.refresh_token,
  };
};

/*
const refreshAccessToken = async (z, bundle) => {
  const response = await z.request({
    url: 'https://auth-json-server.zapier-staging.com/oauth/refresh-token',
    method: 'POST',
    body: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: bundle.authData.refresh_token,
    },
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  });

  // If you're using core v9.x or older, you should call response.throwForStatus()
  // or verify response.status === 200 before you continue.

  // This function should return `access_token`.
  // If the refresh token stays constant, no need to return it.
  // If the refresh token does change, return it here to update the stored value in
  // Zapier
  return {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token,
  };
};
*/

// This function runs before every outbound request. You can have as many as you
// need. They'll need to each be registered in your index.js file.
const includeBearerToken = (request, z, bundle) => {
  if ( bundle.authData.access_token ) {
    request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
  }

  return request;
};

// You want to make a request to an endpoint that is either specifically designed
// to test auth, or one that every user will have access to. eg: `/me`.
// By returning the entire request object, you have access to the request and
// response data for testing purposes. Your connection label can access any data
// from the returned response using the `json.` prefix. eg: `{{json.username}}`.
const test = (z, bundle) =>
  z.request({ url: `https://${process.env.SUBDOMAIN}.envoke.com/v1/settings` });

//TODO: our previous test method...
// Checking for bad response status will no longer work, we need to use middleware (?)
// Or is that not the case during authorization phase (?)
/*
const test = (z, bundle) => {
  // This method can return any truthy value to indicate the credentials are valid.
  // Raise an error to show
  return z.request({
    url: `https://${process.env.SUBDOMAIN}.envoke.com/v1/interests`,
  }).then((response) => {
    if ( response.status === 401 ) {
      throw new Error('The username and/or password you supplied is incorrect');
    }
    return response;
  });
}
*/

// response_type=code&client_id=d6d096c9336cb5c4418625626c9ce505&redirect_uri=https%3A%2F%2Fe1.envoke.com%2Fbegin&scope=all

module.exports = {
  // config: {
    // OAuth2 is a web authentication standard. There are a lot of configuration
    // options that will fit most any situation.
    type: 'oauth2',
    oauth2Config: {
      authorizeUrl: {
        url: `https://${process.env.SUBDOMAIN}.envoke.com/ext/oauth/authorize`,
        params: {
          //TODO: incredibly, the order of these parameters appears to matter...
          response_type: 'code',
          client_id: '{{process.env.CLIENT_ID}}',
          scope: 'all',

          //TODO: these two are not populated by Zapier?
          // state: '{{bundle.inputData.state}}',
          redirect_uri: '{{bundle.inputData.redirect_uri}}',
        },
      },
      getAccessToken,
      // refreshAccessToken,
      // autoRefresh: true,
    },

    // Define any input app's auth requires here. The user will be prompted to enter
    // this info when they connect their account.
    fields: [],

    // The test method allows Zapier to verify that the credentials a user provides
    // are valid. We'll execute this method whenever a user connects their account for
    // the first time.
    test,

    // This template string can access all the data returned from the auth test. If
    // you return the test object, you'll access the returned data with a label like
    // `{{json.X}}`. If you return `response.data` from your test, then your label can
    // be `{{X}}`. This can also be a function that returns a label. That function has
    // the standard args `(z, bundle)` and data returned from the test can be accessed
    // in `bundle.inputData.X`.

    // connectionLabel: '{{json.name}} (ID: {{json.id}})',

    //TODO: I think we're good with just the account name here... we could add ID if needed (?)
    connectionLabel: '{{json.name}}',

    /*
    connectionLabel: (z, bundle) => {

      z.console.log(bundle);

      return `${bundle.inputData.name} (ID: ${bundle.inputData.id})`;
    },
    */

  // },

  // befores: [includeBearerToken],
  // afters: [],

};