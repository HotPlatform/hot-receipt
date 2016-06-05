'use strict'

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

const _hourly = {
  tag: 'bra_juwEhBi/hourly/20160601',
  date: 20160601,
  metadata: {
    brand_id: 'bra_juwEhBi',
    brand_name: 'McDonalds',
    event_type: 'hourly'
  },
  hours: [
    {
      hour: 0,
      sales: 12000,
      sales_amount: 24000,
      sent: 10000,
      sent_failed: 20,
      customer_new: 10000,
      customer_repeat: 20
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

exports.create = (req, res) => {
  // new Receipt().save(in);

  // -- this below here should be inside receipt?
  // new HourlyReport().save(in);
  // new DailyReport().save(in);
  // new WeeklyReport().save(in);
  // new MonthlyReport().save(in);
  // new YearlyReport().save(in);

  // new Postman().queue(in);

  // const Receipt = Parse.Object.extend('Receipt');
  // const receipt = new Receipt();
  // receipt.save(_receipt);

  // const qReceipt = new Parse.Query(Receipt);
  // qReceipt.first({
  //   success: function(result) {
  //       console.log('1 > ' + JSON.stringify(result));
  //   }
  // });

  const HourlyReport = Parse.Object.extend('HourlyReport');
  // const hourly = new HourlyReport();
  // hourly.save(_hourly);

  const q1 = new Parse.Query(HourlyReport);
  q1.equalTo('tag', 'bra_juwEhBi/hourly/20160601');
  q1.first({
    success: function(result) {
      try {
        console.log(result);
        console.log(result.id);
        console.log(result.get('hours'));
        // console.log(JSON.stringify(result));
      } catch (e) {
        console.log(e);
      }
    }
  });

  return res.send(new Date());
};
