'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _truckName = require('../model/truckName');

var _truckName2 = _interopRequireDefault(_truckName);

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

  // '/v1/truck/add' - Create
  // This function will add a new truck to the DB.
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.post('/add', function (req, res) {
    var newTruck = new _truckName2.default();
    newTruck.name = req.body.name;

    newTruck.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Truck saved successfully' });
    });
  });

  // '/v1/truck' - Read
  // Returns the entire DB.
  api.get('/', function (req, res) {
    _truckName2.default.find({}, function (err, trucks) {
      if (err) {
        res.send(err);
      }
      res.json(trucks);
      console.log(trucks);
    });
  });

  // '/v1/truck/:id' - Read 1
  // Finds a truck by its id.
  api.get('/:id', function (req, res) {
    _truckName2.default.findById(req.params.id, function (err, truck) {
      if (err) {
        res.send(err);
      }
      res.json(truck);
    });
  });

  // '/v1/truck/:id' - Update
  // Updates a truck.
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.put('/update/:id', function (req, res) {
    _truckName2.default.findById(req.params.id, function (err, truck) {
      if (err) {
        res.send(err);
      }
      truck.name = req.body.name;

      truck.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Truck info updated successfully' });
      });
    });
  });

  // '/v1/truck/:id' - Delete
  // Deletes a truck from the DB
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.delete('/:id', function (req, res) {
    _truckName2.default.findById(req.params.id, function (err, truck) {
      if (err) {
        res.status(505).send(err);
        return;
      }
      if (truck === null) {
        res.status(404).send(err);
        return;
      }
      _truckName2.default.remove({
        _id: req.params.id
      }, function (err, TruckName) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Truck successfully deleted" });
      });
    });
  });

  return api;
};
//# sourceMappingURL=truck.js.map