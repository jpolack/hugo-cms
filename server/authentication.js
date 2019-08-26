const fetch = require('node-fetch');
const queryString = require('query-string');

const clientID = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;

if (!clientSecret || clientSecret.length === 0) {
  throw new Error('missing CLIENTSECRET');
}

if (!clientID || clientID.length === 0) {
  throw new Error('missing CLIENTID');
}

const authenticationHandler = async (req, res) => {
  const requestToken = req.query.code;
  const result = await fetch(`https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`);
  const text = await result.text();

  const urlData = queryString.parse(text);

  res.redirect(`/auth?accessToken=${urlData.access_token}`);
};

module.exports = authenticationHandler;
