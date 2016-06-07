'use strict';

const nodemailer = require('nodemailer');

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



  // import moment from 'moment';

  // factorise because metadata will be using same thing
  // best to keep common var private
  // function generateObjectId() {
  //   /* generate id format: Date/Type/Batch e.g. 20160106/Receipt/0001 */
  //   const today = moment().format('YYYYMMDD');
  //   const type  = 'Receipt';
  //   const batch = '0001'; // fixme: must check exist
  //
  //   let _objectId = [today, type, batch];
  //   return _objectId.join('/');
  // }

  // export class ReceiptPrinter {
  //   constructor() {
  //
  //   }
  //
  //   static validate(data) {
  //
  //   }
  //
  //   generateObjectId() {
  //     /* generate id format: Date/Type/Batch e.g. 20160106/Receipt/0001 */
  //
  //     // TODO today is not defined <- must define in constructor first
  //     this.today = moment().format('YYYYMMDD');
  //     this.type  = 'Receipt';
  //     this.batch = '0001'; // fixme: must check exist
  //
  //     let _objectId = [today, type, batch];
  //     return _objectId.join('/');
  //   }
  //
  //   generateMetadata() {
  //     return {
  //       today : this.today,
  //       type: this.type,
  //       batch: this.batch
  //     }
  //   }
  //
  // }
  //
  // export default ReceiptPrinter;
  // module.exports = ReceiptPrinter;
