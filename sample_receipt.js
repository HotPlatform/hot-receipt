{
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
}
