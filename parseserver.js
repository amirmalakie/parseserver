
require('dotenv').config({ path: './config.env' });
const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();

var ip = process.env.IP;
var appid = process.env.APP_ID;
var appname = process.env.APP_NAME;
var masterkey = process.env.MASTERKEY;

console.log(ip);


const server = new ParseServer({
  liveQueryServerURL: `http://${ip}:1337/livequery`,
  databaseURI: `mongodb://localhost:27017/${appname}`, 
  cloud: './cloud/main.js',
  appId: `${appid}`,
  masterKey: `${masterkey}`,
  serverURL: `http://${ip}:1337/parse`,  
  liveQuery: {
    classNames: ["Test", "Comments"] 
  },
  collections: ['_Installation'],
  production: false,
  logsFolder: './logs',
  push: {
    android: {
      senderId: 'YOUR_SENDER_ID',
      apiKey: 'YOUR_API_KEY',
      appPackageName: 'com.your.package.name'
    },
    // ios: [
    //   {
    //     pfx: '',
    //     bundleId: 'YOUR_BUNDLE_ID',
    //     production: false // Set to true for production environment
    //   }
    // ]
  }
});

 server.start();


app.use('/parse', server.app);

app.listen(1337, function() {
  console.log('parse-server running on port 1337.');
});






