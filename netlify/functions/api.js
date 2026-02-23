import serverless from 'serverless-http';
import app from '../../server/server.js';

const handlerOptions = {
  request: (request, event, context) => {
    let path = event.path;
    if (path.startsWith('/.netlify/functions/api')) {
      path = path.replace('/.netlify/functions/api', '');
    }
    if (path === '') path = '/';
    if (!path.startsWith('/api')) {
      path = `/api${path === '/' ? '' : path}`;
    }
    request.url = path;
  }
};

export const handler = serverless(app, handlerOptions);
