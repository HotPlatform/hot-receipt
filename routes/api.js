



var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

// test request endpoint
router.get('/', function(req, res, next) {
  // res.send('Hello this is endpoint');

  Parse.initialize("hotReceipt");
  Parse.serverURL = 'http://localhost:3000/parse'

  var TestObject = Parse.Object.extend("TestObject");
  var testObject = new TestObject();
  testObject.save({foo: "bar"}).then(function(object) {
    alert("yay! it worked");
  });

  // var smtpConfig = {
  //   host: 'smtp.gmail.com',
  //   port: 465,
  //   secure: true, // use SSL
  //   auth: {
  //     user: '@gmail.com',
  //     pass: ''
  //   }
  // };
  // var transporter = nodemailer.createTransport(smtpConfig);
  // var mailOptions = {
  //   from: 'csechuan@gmail.com', // sender address
  //   to: 'csechuan@gmail.com', // list of receivers
  //   subject: 'Hello ✔', // Subject line
  //   text: 'Hello world 🐴', // plaintext body
  //   html: '<b>Hello world 🐴</b>' // html body
  // };
  //
  // // send mail with defined transport object
  // transporter.sendMail(mailOptions, function(error, info){
  //   if(error){
  //       return console.log(error);
  //   }
  //   console.log('Message sent: ' + info.response);
  // });
});

router.post('/', function(req, res, next) {
  res.send('Hello this is POST endpoint');

});

module.exports = router;
