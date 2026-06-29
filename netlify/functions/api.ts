import serverless from 'serverless-http';
import express from 'express';
import app from '../../src/app';

const netlifyApp = express();

netlifyApp.use(app);

export const handler = serverless(netlifyApp, {
  basePath: '/.netlify/functions'
});
