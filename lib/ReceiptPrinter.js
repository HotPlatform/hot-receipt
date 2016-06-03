'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReceiptPrinter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var ReceiptPrinter = exports.ReceiptPrinter = function () {
  function ReceiptPrinter() {
    _classCallCheck(this, ReceiptPrinter);
  }

  _createClass(ReceiptPrinter, [{
    key: 'generateObjectId',
    value: function generateObjectId() {
      /* generate id format: Date/Type/Batch e.g. 20160106/Receipt/0001 */

      // TODO today is not defined <- must define in constructor first
      this.today = (0, _moment2.default)().format('YYYYMMDD');
      this.type = 'Receipt';
      this.batch = '0001'; // fixme: must check exist

      var _objectId = [today, type, batch];
      return _objectId.join('/');
    }
  }, {
    key: 'generateMetadata',
    value: function generateMetadata() {
      return {
        today: this.today,
        type: this.type,
        batch: this.batch
      };
    }
  }], [{
    key: 'validate',
    value: function validate(data) {}
  }]);

  return ReceiptPrinter;
}();

exports.default = ReceiptPrinter;

module.exports = ReceiptPrinter;