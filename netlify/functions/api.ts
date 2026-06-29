import serverless from 'serverless-http';
import express from 'express';
import app from '../../src/app';

const netlifyApp = express();

// Force add /api prefix if it's missing (Netlify strips the function name)
netlifyApp.use((req, res, next) => {
  if (req.url && !req.url.startsWith('/api')) {
    req.url = '/api' + req.url;
  }
  next();
});

netlifyApp.use(app);

export const handler = serverless(netlifyApp);
