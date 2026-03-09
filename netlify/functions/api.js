import serverless from 'serverless-http';
import app from '../../server/server.js';

export const handler = serverless(app, {
  binary: ['image/*', 'multipart/form-data'],
  request(req, event) {
    // We must rebuild the URL to include both the path and the query string.
    // Otherwise, OAuth callbacks lose the ?code=... and enter an infinite loop.
    let qs = '';

    // Check if rawQueryString exists (newer Netlify API Gateway formats)
    if (event.rawQueryString) {
      qs = '?' + event.rawQueryString;
    }
    // Fallback if it's parsed as an object
    else if (event.queryStringParameters && Object.keys(event.queryStringParameters).length > 0) {
      qs = '?' + new URLSearchParams(event.queryStringParameters).toString();
    }

    req.url = (event.rawPath || event.path) + qs;
  }
});
