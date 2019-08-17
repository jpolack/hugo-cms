
const express = require('express');
const history = require('connect-history-api-fallback');

const appBuilder = require('./app');
const authenticationHandler = require('./authentication');

const app = express();

app.get('/token', authenticationHandler);
app.use(history());
app.use('/', appBuilder);

app.listen(3000);
