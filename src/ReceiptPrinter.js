'use strict';

import moment from 'moment';

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

export class ReceiptPrinter {
  constructor() {

  }

  static validate(data) {

  }

  generateObjectId() {
    /* generate id format: Date/Type/Batch e.g. 20160106/Receipt/0001 */

    // TODO today is not defined <- must define in constructor first
    this.today = moment().format('YYYYMMDD');
    this.type  = 'Receipt';
    this.batch = '0001'; // fixme: must check exist

    let _objectId = [today, type, batch];
    return _objectId.join('/');
  }

  generateMetadata() {
    return {
      today : this.today,
      type: this.type,
      batch: this.batch
    }
  }

}

export default ReceiptPrinter;
module.exports = ReceiptPrinter;
