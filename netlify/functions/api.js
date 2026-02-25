import serverless from 'serverless-http';
import app from '../../server/server.js';

// netlify.toml rewrites /api/* → /.netlify/functions/api/:splat
// Netlify already passes the full path (e.g. /api/auth/login) in event.path.
// Express expects exactly that — so we pass it through with no transformation.
export const handler = serverless(app);
