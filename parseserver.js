const fs = require('fs');
const https = require('https');
const express = require('express');
const ParseServer = require('parse-server').ParseServer;

require('dotenv').config({ path: './config.env' });

const app = express();
const ip = process.env.IP;
const db = process.env.APP_NAME;
const APP_ID = process.env.APP_ID;
const MASTERKEY = process.env.MASTERKEY;
const CLIENT_KEY = process.env.CLIENT_KEY;

console.log(ip);
console.log(db);
console.log(APP_ID);
console.log(MASTERKEY);

const server = new ParseServer({
  liveQueryServerURL: `https://${ip}:1338/livequery`,
  databaseURI: `mongodb://localhost:27017/${db}`, 
  cloud: './cloud/main.js',
  appId: APP_ID,
  masterKey: MASTERKEY,
  clientKey: CLIENT_KEY, 
  serverURL: `https://${ip}:1338/parse`,  
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

const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/app.tasktome.ir/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/app.tasktome.ir/fullchain.pem'),
};

const httpsServer = https.createServer(httpsOptions, app);

server.start();

app.use('/parse', server.app);

httpsServer.listen(1338, function() {
  console.log('parse-server-example running on port 1338 with HTTPS.');
});
