import serverless from 'serverless-http';
import express from 'express';
import app from '../../src/app';

const netlifyApp = express();

netlifyApp.all('*', (req, res, next) => {
  if (req.url === '/test-netlify') {
    res.json({ message: 'Netlify function is working and intercepting requests!', url: req.url, originalUrl: req.originalUrl });
  } else {
    next();
  }
});

netlifyApp.use(app);

export const handler = serverless(netlifyApp);
