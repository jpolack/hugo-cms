const fetch = require('node-fetch');
const queryString = require('query-string');

const clientID = 'a4cb4f76e6d024f070f6';
const clientSecret = process.env.CLIENTSECRET;

if (!clientSecret || clientSecret.length === 0) {
  throw new Error('missing clientsecret');
}

const authenticationHandler = async (req, res) => {
  const requestToken = req.query.code;
  const result = await fetch(`https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`);
  const text = await result.text();

  const urlData = queryString.parse(text);

  res.redirect(`/auth?accessToken=${urlData.access_token}`);
};

module.exports = authenticationHandler;
