'use strict';

const HourlyReporter = require('../HourlyReporter');
const ReceiptPrinter = require('../ReceiptPrinter');

const fakeInput = { sales: 100 };

export function create(req, res, next) {
  validate(fakeInput).then(() => {
    // FIXME parallel not ideal because one fail doesnt affect the rest - try batch
    const promises = [];
    promises.push(HourlyReporter.create(fakeInput));
    promises.push(ReceiptPrinter.sendEmail(fakeInput));
    return Parse.Promise.when(promises);
  }).then(() => {
    res.send('created');
  }, err => {
    res.send(err);
  });
}

// var sendReceipt = function(input) {
//   var promise = new Parse.Promise();
//   console.log('sendReceipt')
//   promise.reject('failed in sendReceipt');
//   return promise;
// };

// var createHourReport = function(input) {
//   var promise = new Parse.Promise();
//   console.log('createHourReport')
//   promise.resolve();
//   return promise;
// };

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

export function retrieve(req, res, next) {
  const receiptId = req.params.id;

  if (!receiptId) {
    return res.render('login');
  }

  const Receipt = Parse.Object.extend('Receipt');
  const query = new Parse.Query(Receipt);
  query.equalTo('objectId', receiptId);

  // TODO setup receipt & receipt not found pages
  query.first().then((result) => {
    if (result) {
      return res.render('index', { data: result });
    } else {
      return res.render('login');
    }
  });
}
