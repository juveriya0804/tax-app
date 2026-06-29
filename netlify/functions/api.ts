import serverless from 'serverless-http';
import express from 'express';
import app from '../../src/app';

const netlifyApp = express();

netlifyApp.use((req, res, next) => {
  if (req.url === '/debug') {
    res.json({ url: req.url, originalUrl: req.originalUrl, path: req.path });
  } else {
    next();
  }
});

netlifyApp.use((req, res, next) => {
  if (req.url && !req.url.startsWith('/api')) {
    req.url = '/api' + req.url;
  }
  if (req.originalUrl && !req.originalUrl.startsWith('/api')) {
    req.originalUrl = '/api' + req.originalUrl;
  }
  next();
});

netlifyApp.use(app);

export const handler = serverless(netlifyApp);
