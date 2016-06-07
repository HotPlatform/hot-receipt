'use strict';

const nodemailer = require('nodemailer');

const _receipt = {
  customer: {
    email: 'csechuan@gmail.com'
  },
  currency: 'myr',
  amount: 999,
  amount_returned: null,
  invoice_number: 'inv_8MjIoe3ekbG8Pw',
  invoice_timestamp: '2016-06-01T12:00:00Z',
  status: 'canceled', // paid, canceled, fulfilled, returned
  payments: [
    {
      currency: 'myr',
      amount: 99,
      source: 'cash', // cash, card
      last4: null, // card ending number
      status: 'paid' // paid, refunded, canceled
    }
  ],
  items: [
    {
      currency: 'myr',
      amount: 900,
      description: null,
      quantity: 2,
      type: 'sku' // tax, shipping, sku, discount
    }
  ]
};

const _delivery = {
  tag: 'bra_juwEhBi/delivery/20160601',
  date: 20160601,
  hours: [
    {
      hour: 0,
      sales: 12000,
      sales_amount: 24000,
      sent: 10000,
      sent_failed: 20
    },
    {
      hour: 1,
      sales: 12000,
      sales_amount: 24000,
      sent: 10000,
      sent_failed: 20,
      customer_new: 10000,
      customer_repeat: 20
    }
  ]
};


export function create(req, res) {
  // TODO validate input

  const input = req.body;

  // ========= Save receipt =============
  const Receipt = Parse.Object.extend('Receipt');
  const receipt = new Receipt();
  receipt.save(input);

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

  // ========= Save delivery =============
  const Delivery = Parse.Object.extend('Delivery');
  const delivery = new Delivery();
  delivery.save(input);

  // TODO throw this
  res.send('hello');
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
  //
  // export function create(receipt) {
  //   const promise = new Parse.Promise();
  //   console.log('createDailyReport')
  //   promise.resolve();
  //   return promise;
  // }
