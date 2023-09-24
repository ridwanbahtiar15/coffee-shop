const { google } = require("googleapis");
const { clientId, clientSecret, refreshToken } = require("./environments");

const client = new google.auth.OAuth2(clientId, clientSecret);

client.setCredentials({
  refresh_token: refreshToken,
});

module.exports = client;
