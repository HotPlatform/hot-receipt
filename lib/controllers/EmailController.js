'use strict';

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// factorise because metadata will be using same thing
// best to keep common var private
function generateObjectId() {
  /* generate id format: Date/Type/Batch e.g. 20160106/Receipt/0001 */
  var today = (0, _moment2.default)().format('YYYYMMDD');
  var type = 'Receipt';
  var batch = '0001'; // fixme: must check exist

  var _objectId = [today, type, batch];
  return _objectId.join('/');
}