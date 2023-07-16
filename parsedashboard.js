require('dotenv').config({ path: './config.env' });
var express = require('express');
var ParseDashboard = require('parse-dashboard');

var ip = process.env.IP;
var appname = process.env.APP_NAME;
var APP_ID = process.env.APP_ID;
var MASTERKEY = process.env.MASTERKEY;

var options = { allowInsecureHTTP: true };

const dashboard = new ParseDashboard({
    "apps": [
      {
        "serverURL": `http://${ip}:1337/parse`,
        "appId": `${APP_ID}`,
        "masterKey": `${MASTERKEY}`,
        "appName": `${appname}`,
    }
    ],
    "users": [
      {
        "user": "amirmalakie",
        "pass": "iranianseda"
      }
    ]
  }, options);

var app = express();

app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(4040);