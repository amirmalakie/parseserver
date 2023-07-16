const express = require('express');
const ParseDashboard = require('parse-dashboard');

var config = {
  "allowInsecureHTTP": true,
  "apps": [{
    "serverURL": 'http://213.142.151.200:1337/parse1',
    "appId": 'myAppId1',
    "masterKey": 'myMasterKey1',
    "appName": "Amir",
    "production": false
  },
  {
    "serverURL": 'http://213.142.151.200:1337/parse2',
    "appId": 'myAppId2',
    "masterKey": 'myMasterKey2',
    "appName": "AmirS",
    "production": false
  }],
  "users": [
    {
      "user": "user1",
      "pass": "user1"
    },
    {
      "user": "user2",
      "pass": "user2"
    }
  ]
};

const dashboard = new ParseDashboard(config, { allowInsecureHTTP: config.allowInsecureHTTP });

const app = express();

app.use('/parse-dashboard', dashboard);

const port = 4040;
app.listen(port, () => {
  console.log(`Parse Dashboard running on port ${port}.`);
})