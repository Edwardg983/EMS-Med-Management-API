'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _boxName = require('../model/boxName');

var _boxName2 = _interopRequireDefault(_boxName);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _authMiddleware = require('../middleware/authMiddleware');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // '/v1/box/add' - Create
  // This function will add a new box to the DB.
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.post('/add', function (req, res) {
    var newBox = new _boxName2.default();

    newBox.name = req.body.name;
    newBox.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Box saved successfully' });
    });
  });

  // '/v1/box' - Read
  // Returns the entire DB.
  api.get('/', function (req, res) {
    _boxName2.default.find({}, function (err, boxs) {
      if (err) {
        res.send(err);
      }
      res.json(boxs);
    });
  });

  // '/v1/box/:id' - Read 1
  // Finds a truck by its id.
  api.get('/:id', function (req, res) {
    _boxName2.default.findById(req.params.id, function (err, box) {
      if (err) {
        res.send(err);
      }
      res.json(box);
    });
  });

  // '/v1/box/:id' - Update
  // Updates a box.
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.put('/update/:id', function (req, res) {
    _boxName2.default.findById(req.params.id, function (err, box) {
      if (err) {
        res.send(err);
      }
      box.name = req.body.name;

      box.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Box info updated successfully' });
      });
    });
  });

  // '/v1/box/:id' - Delete
  // Deletes a truck from the DB
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.delete('/:id', function (req, res) {
    console.log(req.params.id);
    _boxName2.default.findById(req.params.id, function (err, box) {
      if (err) {
        res.status(505).send(err);
        return;
      }
      if (box === null) {
        res.status(404).send(err);
        return;
      }
      _boxName2.default.remove({
        _id: req.params.id
      }, function (err, BoxName) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Box successfully deleted" });
      });
    });
  });

  return api;
};
//# sourceMappingURL=box.js.map