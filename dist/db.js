'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (callback) {
  _mongoose2.default.Promise = global.Promise;
  var db = _mongoose2.default.connect('mongodb://localhost:27017/ems-medication-management-api', { useNewUrlParser: true, useCreateIndex: true
    /*useMongoClient: true,*/
    /* The useMongoClient was required after updating to lastest version of mongoose. Not used in Jack's API course. */
  });
  callback(db);
};
//# sourceMappingURL=db.js.map