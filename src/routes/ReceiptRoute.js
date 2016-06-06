var express = require('express');
var router = express.Router();

var fakeInput = { sales: 100 };

exports.create = (req, res, next) => {
  res.send('create');
}

exports.retrieve = (req, res, next) => {
  // validate the only receiptId in the path
  res.send('retrieve');
}

// router.get('/', function(req, res, next) {
//   validate(fakeInput).then(function() {
//     // FIXME parallel not ideal because one fail doesnt affect the rest - try batch
//     var promises = [];
//     promises.push(createHourReport(fakeInput));
//     promises.push(sendReceipt(fakeInput));
//     return Parse.Promise.when(promises);
//   }).then(function() {
//     res.send('It works!');
//   }, function(err) {
//     res.send(err);
//   });
// });
//
// var sendReceipt = function(input) {
//   var promise = new Parse.Promise();
//   console.log('sendReceipt')
//   promise.reject('failed in sendReceipt');
//   return promise;
// };
//
// var createHourReport = function(input) {
//   var promise = new Parse.Promise();
//   console.log('createHourReport')
//   promise.resolve();
//   return promise;
// };
//
// var validate = function(input) {
//   var promise = new Parse.Promise();
//   console.log('validate');
//   if (input.sales) {
//     promise.resolve();
//   } else {
//     promise.reject();
//   }
//   return promise;
// };
//
//
// module.exports = router;
