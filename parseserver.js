
require('dotenv').config();
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var ParseDashboard = require('parse-dashboard');
const { exec } = require('child_process');

var ip = process.env.IP;


var liveQueryServerURL = `http://${ip}:1337/livequery`;

var api1 = new ParseServer({
liveQueryServerURL: `http://${ip}:1337/livequery`,
databaseURI: 'mongodb://localhost:27017/dev1', 
cloud: './cloud/main',
appId: 'myAppId1',
masterKey: 'myMasterKey1',
serverURL: `http://${ip}:1337/parse`,  
liveQuery: {
  classNames: ["Test", "Comments"] 
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
    liveQueryServerURL: `http://${ip}:1337/livequerytask`,
    databaseURI: 'mongodb://localhost:27017/dev2', 
    cloud: './cloud/task',
    appId: 'myAppId2',
    masterKey: 'myMasterKey2', 
    serverURL: `http://${ip}:1337/parse`,  
    liveQuery: {
      classNames: ["Test", "Comments"] 
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


var app = express();
app.use('/public', express.static(path.join(__dirname, '/public')));

var mountPath = process.env.PARSE_MOUNT || '/parse';

app.use(mountPath, api1);
app.use(mountPath, api2);

app.get('/', function(req, res) {
res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});
app.get('/test', function(req, res) {
res.sendFile(path.join(__dirname, '/public/test.html'));
});
var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
console.log('parse-server-example running on port ' + port + '.');
});
ParseServer.createLiveQueryServer(httpServer);

var config = {
    "allowInsecureHTTP": true,
    "apps": [{
        "serverURL": `http://${ip}:1337/parse`,
        "appId": 'myAppId1',
        "masterKey": 'myMasterKey1',
        "appName": "Amir",
        "production": false
      },
      {
        "serverURL": `http://${ip}:1337/parse`,
        "appId": 'myAppId2',
        "masterKey": 'myMasterKey2',
        "appName": "Task",
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
      ],
  };

  var dashboard = new ParseDashboard(config, {allowInsecureHTTP: config.allowInsecureHTTP});

  
var dashApp = express();
dashApp.use('/dashboard', dashboard);
dashApp.get('/', function(req, res) {
res.status(200).send('Parse Dashboard App');
});
var httpServerDash = require('http').createServer(dashApp);
httpServerDash.listen(4040, function() {
console.log('dashboard-server running on port 4040.');
});

