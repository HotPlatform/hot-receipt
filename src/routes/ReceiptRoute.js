'use strict';

const nodemailer = require('nodemailer');

export function create(req, res) {
  const input = req.body;

  // ========= Sending mail =============
  const transporter = nodemailer.createTransport(
    'smtps://raymondroid100%40gmail.com:raymond999@smtp.gmail.com'
  );

  const mailOptions = {
    to: 'csechuan@gmail.com',
    from: 'raymondroid100@gmail.com',
    subject: 'Receipt',
    html: '<b>Hello world 🐴</b>'
  };

  transporter.sendMail(mailOptions, err => {
    if (err) {
      console.log(err);
    }
  });
}

export function retrieve(req, res, next) {
  const receiptId = req.params.id;

  if (!receiptId) {
    return res.render('login');
  }

  const Receipt = Parse.Object.extend('Receipt');
  const query = new Parse.Query(Receipt);
  query.equalTo('objectId', receiptId);

  // TODO setup receipt & receipt not found pages
  query.first().then(result => {
    if (result) {
      return res.render('index', { data: result });
    } else {
      return res.render('login');
    }
  });
}


// ============ ARCHIEVE

// import Postman from '../Postman';
// const pm = new Postman();
// pm.sayName();


// const ReceiptManager  = require('../ReceiptManager');
// const HourlyReporter  = require('../HourlyReporter');
// const DailyReporter   = require('../DailyReporter');
// const WeeklyReporter  = require('../WeeklyReporter');
// const MonthlyReporter = require('../MonthlyReporter');
// const YearlyReporter  = require('../YearlyReporter');
// const ReceiptPrinter  = require('../ReceiptPrinter');
  // const input = req.body;
  //
  // ReceiptManager.create(input).then(receipt => {
  //   // Statuses of parellel processes are ignorable.
  //   const promises = [];
  //   promises.push(HourlyReporter.create(input));
  //   promises.push(DailyReporter.create(input));
  //   promises.push(WeeklyReporter.create(input));
  //   promises.push(MonthlyReporter.create(input));
  //   promises.push(YearlyReporter.create(input));
  //   promises.push(ReceiptPrinter.sendEmail(input));
  //   return Parse.Promise.when(promises);
  // }).then(() => {
  //   res.status(201).send('Created');
  // }, err => {
  //   // This should handle the error of ReceiptManager.create()
  //   // because parallel processes will not throw any errors.
  //   res.status(err.type).send(err.message);
  // });
