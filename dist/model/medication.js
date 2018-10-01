'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var medicationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  expDate: {
    type: String,
    required: true
  },
  truck: {
    type: String,
    required: true
  },
  box: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

module.exports = _mongoose2.default.model('Medication', medicationSchema);
//# sourceMappingURL=medication.js.map