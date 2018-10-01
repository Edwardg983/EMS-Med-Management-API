'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _medication = require('../controller/medication');

var _medication2 = _interopRequireDefault(_medication);

var _truck = require('../controller/truck');

var _truck2 = _interopRequireDefault(_truck);

var _box = require('../controller/box');

var _box2 = _interopRequireDefault(_box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

// Connect to db
(0, _db2.default)(function (db) {
  // internal middleware
  router.use((0, _middleware2.default)({ config: _config2.default, db: db }));

  // api routes v1 (/v1)
  router.use('/medication', (0, _medication2.default)({ config: _config2.default, db: db }));
  router.use('/truck', (0, _truck2.default)({ config: _config2.default, db: db }));
  router.use('/box', (0, _box2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map