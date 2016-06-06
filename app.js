var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware')

var routes = require('./routes/index');
var dashboard = require('./routes/dashboard/index');
var settings = require('./routes/dashboard/settings');
var api = require('./routes/api');

var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
   sass({
     src: __dirname + '/src',
     dest: __dirname + '/public',
     debug: true,
   })
);

// The static middleware must come after the sass middleware
app.use(express.static( path.join( __dirname, 'public' ) ) );

app.use('/', routes);
// app.use('/dashboard', dashboard);
// app.use('/dashboard/settings', settings);
// app.use('/api', api);

// TODO throw this
// const apiController = require('./src/controllers/ApiController');
// app.post('/api', apiController.postReceiptRequest);

// const receiptController = require('./lib/controllers/ReceiptController');
// app.get('/api/receipt', receiptController.create); // TODO change method to POST

// TODO validate /api path with api key
// TODO validate content type
// TODO validate req/sec

const receipt = require('./lib/routes/ReceiptRoute');
app.get('/api/receipts', receipt.create);// TODO change method to POST
app.get('/receipts', receipt.retrieve);

var parse = new ParseServer({
  databaseURI: 'mongodb://localhost:27017', // Connection string for your MongoDB database
  // cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
  appId: 'hotReceipt',
  masterKey: 'hotReceipt123', // Keep this key secret!
  // fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:3000/parse', // Don't forget to change to https if needed
  // verifyUserEmails: true,
  // This will appear in the link that is used to verify email addresses and reset passwords.
  // Set the mount path as it is in serverURL
  // publicServerURL: 'https://localhost:3000/parse',
  // appName: 'Parse App', // Your apps name. This will appear in the subject and body of the emails that are sent.
  // emailAdapter: {
  //   module: 'parse-server-simple-mailgun-adapter',
  //   options: {
  //     // The address that your emails come from
  //     fromAddress: 'parse@example.com',
  //     // Your domain from mailgun.com
  //     domain: 'example.com',
  //     // Your API key from mailgun.com
  //     apiKey: 'key-mykey',
  //   }
  // }
});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', parse);

var pd = new ParseDashboard({
  "apps": [
    {
      "serverURL": "http://localhost:3000/parse",
      "appId": "hotReceipt",
      "masterKey": "hotReceipt123",
      "appName": "receipt"
    }
  ]
});

app.use('/pd', pd);

// var ReceiptPrinter = require('./lib/ReceiptPrinter');
// var rp = new ReceiptPrinter();
// rp.generateObjectId();
// console.log(rp.generateMetadata());

// var kue = require('kue')
//   , queue = kue.createQueue();
//
// var job = queue.create('email', {
//       title: 'welcome email for tj'
//     , to: 'tj@learnboost.com'
//     , template: 'welcome-email'
// }).save( function(err){
//     if( !err ) console.log( job.id );
// });
//
// queue.process('email', function(job, done){
//     print();
//     done();
// });
//
// function print() {
//   console.log('You will see this message every second');
// }

// var kue = require('kue');
// var ui = require('kue-ui');
//
// ui.setup({
//   apiURL: '/kue-api', // IMPORTANT: specify the api url
//   baseURL: '/kue', // IMPORTANT: specify the base url
//   updateInterval: 50000000 // Optional: Fetches new data every 5000 ms
// });
//
// app.use('/kue-api', kue.app);
// app.use('/kue', ui.app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
