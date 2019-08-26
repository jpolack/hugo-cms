
const express = require('express');
const history = require('connect-history-api-fallback');

const appBuilder = require('./app');
const authenticationHandler = require('./authentication');

const app = express();

app.get('/token', authenticationHandler);
app.use(history());

if (process.env.NODE_ENV !== 'production') {
  console.log('adding dev route');
  app.use('/', appBuilder);
} else {
  console.log('adding prod route');
  app.use('/', express.static(`${__dirname}/../app/dist`));
}

app.listen(3000);
