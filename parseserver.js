
require('dotenv').config({ path: './config.env' });
const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();
var ip = process.env.IP;
var db = process.env.APP_NAME;
var APP_ID = process.env.APP_ID;
var MASTERKEY = process.env.MASTERKEY;

console.log(ip);
console.log(db);
console.log(APP_ID);
console.log(MASTERKEY);

const server = new ParseServer({
  liveQueryServerURL: `http://${ip}:1337/livequery`,
  databaseURI: `mongodb://localhost:27017/${db}`, 
  cloud: './cloud/main.js',
  appId: `${APP_ID}`,
  masterKey: `${MASTERKEY}`,
  serverURL: `http://${ip}:1337/parse`,  
  liveQuery: {
    classNames: ["Test", "Comments"] 
  },
  masterKeyIps: [ "0.0.0.0/0" ],
  collections: ['_Installation'],
  production: false,
  logsFolder: '/root/parse/',
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
  console.log('parse-server-example running on port 1337.');
});






