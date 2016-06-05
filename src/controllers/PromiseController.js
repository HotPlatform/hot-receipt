var express = require('express');
var router = express.Router();

var fakeInput = { sales: 100 };

router.get('/', function(req, res, next) {
  validate(fakeInput).then(function() {
    console.log('run these in parallel');
    var promises = [];
    promises.push(createHourReport(fakeInput));
    promises.push(sendReceipt(fakeInput));
    return Parse.Promise.when(promises);
  }).then(function() {
    res.send('It works!');
  });
});

var sendReceipt = function(input) {
  var promise = new Parse.Promise();
  console.log('sendReceipt')
  promise.resolve();
  return promise;
};

var createHourReport = function(input) {
  var promise = new Parse.Promise();
  console.log('createHourReport')
  promise.resolve();
  return promise;
};

var validate = function(input) {
  var promise = new Parse.Promise();
  console.log('validate');
  if (input.sales) {
    promise.resolve();
  } else {
    promise.reject();
  }
  return promise;
};


module.exports = router;
