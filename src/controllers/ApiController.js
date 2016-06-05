// 'use strict';
//
// const sampleInputs = {
//   // customer: {
//   //   email: 'hello@example.com'
//   // },
//   email: 'hello@example.com',
//   currency: 'myr',
//   amount: 999,
//   amount_returned: null,
//   invoice_number: 'inv_8MjIoe3ekbG8Pw',
//   invoice_timestamp: '2016-06-01T12:00:00Z',
//   status: 'canceled', // paid, canceled, fulfilled, returned
//   payments: [
//     {
//       currency: 'myr',
//       amount: 99,
//       source: 'cash', // cash, card
//       last4: null,
//       status: 'paid' // paid, refunded, canceled
//     },
//     {
//       currency: 'myr',
//       amount: 900,
//       source: 'card', // cash, card
//       last4: '1234', // card ending number
//       status: 'refunded'
//     }
//   ],
//   items: [
//     {
//       currency: 'myr',
//       amount: 900,
//       description: null,
//       quantity: 2,
//       type: 'sku' // tax, shipping, sku, discount
//     },
//     {
//       currency: 'myr',
//       amount: 99,
//       description: null,
//       quantity: null,
//       type: 'shipping'
//     },
//     {
//       currency: 'myr',
//       amount: 0,
//       description: null,
//       quantity: null,
//       type: 'tax'
//     },
//     {
//       currency: 'myr',
//       amount: 0,
//       description: null,
//       quantity: null,
//       type: 'discount'
//     }
//   ]
// };
//
// //var kue = require('kue') , queue = kue.createQueue();
//
// var nodemailer = require('nodemailer');
//
//
// function email(payload, done) {
//   console.log('You will see this message');
//   // setTimeout(function(){ console.log("Hello"); }, 1000);
//
//   // create reusable transporter object using the default SMTP transport
//   var transporter = nodemailer.createTransport('smtps://raymondroid100%40gmail.com:raymond999@smtp.gmail.com');
//
//   // setup e-mail data with unicode symbols
//   var mailOptions = {
//     from: 'csechuan@gmail.com', // sender address
//     to: payload.to, // list of receivers
//     subject: payload.subject, // Subject line
//     html: payload.body // html body
//   };
//
//   // send mail with defined transport object
//   transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);
//   });
//
//
//   done();
// }
//
// exports.postReceiptRequest = (req, res) => {
//   // validate req inputs - handle same ref num
//   // create objects
//   // save them
//
//   // required: email, currency(myr), invoice_number(auto-gen == objectId),
//   // amount(0), invoice_timestamp(now), status (paid),
//   // amount_returned(null), payments(null), items(null)
//   // response - return full object
//
//   // curl -XPOST -H "Content-Type: application/json" -d '{"email":"hello@example.co","currency":"myr","amount":999,"amount_returned":null,"invoice_number":"inv_8MjIoe3ekbG8Pw","invoice_timestamp":"2016-06-01T12:00:00Z","status":"canceled","items":[{"currency":"myr","amount":99,"description":null,"quantity":1,"type":"sku"}]}' 'http://localhost:3000/api'
//
//   // res.setHeader('Content-Type', 'text/plain')
//   // res.write('you posted:\n')
//   // res.end(JSON.stringify(req.body, null, 2))
//
//
//
//   // real
//   console.log(req.body);
//   console.log(req.body.email);
//
//   // validate supported type
//   let conType = req.headers['content-type'];
//   if (!conType || conType.indexOf('application/json') !== 0) {
//     return res.send(415);
//   }
//
//   let input = req.body;
//
//   // fixme: malformed json object
//
//   // validate required fields
//   if (!input.email) {
//     return res.status(400).send('Email is required');
//   }
//
//   // fill default values
//   input.currency =  input.currency || 'myr';
//   input.amount =  input.amount || 0;
//   input.invoice_number =  input.invoice_number || 'inv_8MjIoe3ekbG8Pw';
//   input.invoice_timestamp =  input.invoice_timestamp || new Date();
//   input.status =  input.status || 'paid';
//
//   const Invoice = Parse.Object.extend('Invoice');
//   const invoice = new Invoice();
//
//   invoice.save(input).then((result, err) => {
//     if (err) {
//       return res.status(500).send('Service unavailable');
//     } else {
//
//         try {
//           var job = queue.create('email', {
//               to: input.email
//             , subject: `Receipt ${new Date()}`
//             , body: 'hello abc'
//           })
//           .removeOnComplete(true)
//           .save( function(err){
//               if( !err ) console.log( job.id );
//           });
//
//           queue.on('job enqueue', function(id, type){
//               console.log( 'Job %s got queued of type %s', id, type );
//           }).on('job complete', function(id, result){
//               console.log( 'Job %s got completed ', id );
//           });
//
//           queue.process('email', function(job, done) {
//             email(job.data, done);
//           });
//         } catch ( ex) {
//           console.log(ex);
//         }
//
//       return res.json(result);
//     }
//   });
// }
