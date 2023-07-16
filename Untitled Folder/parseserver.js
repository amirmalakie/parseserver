const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();

var api1 = new ParseServer({
liveQueryServerURL: 'http://213.142.151.200:1337/livequery',
databaseURI: 'mongodb://localhost:27017/dev1', // Connection string foryour MongoDB database
cloud: './cloud/main',
appId: 'myAppId1',
masterKey: 'myMasterKey1', // Keep this key secret!
serverURL: 'http://213.142.151.200:1337/parse',  // Don't forget to change to https if needed
liveQuery: {
  classNames: ["Test", "Comments"] // List of classes to support for query subscriptions
},
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


var api2 = new ParseServer({
    liveQueryServerURL: 'http://213.142.151.200:1337/livequerytask',
    databaseURI: 'mongodb://localhost:27017/dev2', // Connection string foryour MongoDB database
    cloud: './cloud/task',
    appId: 'myAppId2',
    masterKey: 'myMasterKey2', // Keep this key secret!
    serverURL: 'http://213.142.151.200:1337/parse',  // Don't forget to change to https if needed
    liveQuery: {
      classNames: ["Test", "Comments"] // List of classes to support for query subscriptions
    },
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

// Start servers
 Promise.all([
  api1.start(),
  api2.start()
]);

// Serve the Parse API for the first application on the /parse1 URL prefix
app.use('/parse1', api1.app);

// Serve the Parse API for the second application on the /parse2 URL prefix
app.use('/parse2', api2.app);

app.listen(1337, function() {
  console.log('parse-server-example running on port 1337.');
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
console.log('parse-server-example running on port ' + port + '.');
});
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);