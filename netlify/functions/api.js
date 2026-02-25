import serverless from 'serverless-http';
import app from '../../server/server.js';

// How the Netlify redirect works:
//   netlify.toml: /api/* → /.netlify/functions/api  (no :splat)
//   This preserves the original request path inside event.rawPath and event.path.
//   Express sees /api/auth/login and correctly matches its routes.
//
// The extra rawPath handler below is a safety net — event.rawPath is ALWAYS
// the original browser request path, even if Netlify's internal routing changes.
export const handler = serverless(app, {
  request(req, event) {
    // event.rawPath = original browser path, e.g. /api/auth/login
    // event.path   = same when :splat is NOT used in the redirect target
    req.url = event.rawPath || event.path;
  }
});
