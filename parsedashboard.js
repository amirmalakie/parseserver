require('dotenv').config({ path: './config.env' });
const express = require('express');
const ParseDashboard = require('parse-dashboard');
const ParseServer = require('parse-server').ParseServer;
const fs = require('fs');
const https = require('https');

const ip = process.env.IP;
const appname = process.env.APP_NAME;
const APP_ID = process.env.APP_ID;
const MASTERKEY = process.env.MASTERKEY;
const CLIENT_KEY = process.env.CLIENT_KEY;

// Parse Server Configuration
const parseServerOptions = {
  databaseURI: `mongodb://localhost:27017/${appname}`,
  cloud: './cloud/main.js',
  appId: APP_ID,
  masterKey: MASTERKEY,
  clientKey: CLIENT_KEY,
  serverURL: `https://${ip}:1337/parse`,
  liveQuery: {
    classNames: ["Test", "Comments"]
  },
  masterKeyIps: ["0.0.0.0/0"],
  collections: ['_Installation'],
  production: false,
  logsFolder: '/root/parse/',
  push: {
    android: {
      senderId: 'YOUR_SENDER_ID',
      apiKey: 'YOUR_API_KEY',
      appPackageName: 'com.your.package.name'
    }
  }
};

const parseServer = new ParseServer(parseServerOptions);

// Parse Dashboard Configuration
const dashboardOptions = { allowInsecureHTTP: true };

const dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": `https://${ip}:1337/parse`,
      "appId": APP_ID,
      "masterKey": MASTERKEY,
      "appName": appname,
      "clientKey": CLIENT_KEY,
    }
  ],
  "users": [
    {
      "user": "amirmalakie",
      "pass": "iranianseda"
    }
  ]
}, dashboardOptions);

const app = express();

app.use('/dashboard', dashboard);

// Set up HTTPS server
const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/app.tasktome.ir/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/app.tasktome.ir/fullchain.pem'),
};

const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(443, function () {
  console.log('HTTPS server listening on port 443.');
});

parseServer.start();
