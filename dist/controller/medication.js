'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _medication = require('../model/medication');

var _medication2 = _interopRequireDefault(_medication);

var _medName = require('../model/medName');

var _medName2 = _interopRequireDefault(_medName);

var _truckName = require('../model/truckName');

var _truckName2 = _interopRequireDefault(_truckName);

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

  // '/v1/medication/add' - Create
  // This function will add a new med to the DB.
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.post('/add', function (req, res) {
    var newMed = new _medication2.default();
    newMed.name = req.body.name;
    newMed.expDate = req.body.expDate;
    newMed.quantity = req.body.quantity;
    newMed.box = req.body.box;
    newMed.truck = req.body.truck;

    newMed.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Medication saved successfully' });
    });
  });

  // '/v1/medication' - Read
  // Returns the entire DB.
  api.get('/', function (req, res) {
    _medication2.default.find({}, function (err, medications) {
      if (err) {
        res.send(err);
      }
      res.json(medications);
    });
  });

  // '/v1/medication/:id' - Read 1
  // Finds a med by its id.
  // api.get('/:id', (req, res) => {
  //   Medication.findById(req.params.id, (err, medication) => {
  //     if (err) {
  //       res.send(err);
  //     }
  //     res.json(medication);
  //   });
  // });

  // TODO: '/v1/medication/medUsed' - Reads med by name, truck, box (Believe this will be a MongoDB find operation). Look in the back of green UNH
  // notebook for addtional notes on this function.
  // AS OF 12/22/17 THIS FUNC WORKS.
  // Returns all the meds by a specific name on a specific truck in a specific box.

  api.get('/medUsed/:name/:truck/:box', function (req, res) {
    _medication2.default.find({ name: req.params.name, truck: req.params.truck, box: req.params.box }, function (err, medications) {
      if (err) {
        res.send(err);
      }
      res.json(medications);
    });
  });

  api.get('/getMedExists/:name/:truck/:box/:expDate', function (req, res) {
    console.log(req.params.expDate);
    _medication2.default.find({ name: req.params.name, truck: req.params.truck, box: req.params.box, expDate: req.params.expDate }, function (err, medications) {
      if (err) {
        res.send(err);
      }
      res.json(medications);
    });
  });

  // Returns all the meds with the specified name in all the trucks. Will also indicate which box they are in.
  api.get('/medUsed/:name', function (req, res) {
    _medication2.default.find({ "name": req.params.name }, function (err, medications) {
      if (err) {
        res.send(err);
      }
      res.json(medications);
    });
  });

  // '/v1/medication/getDistinctMedNames'
  // Returns the distinct med names.
  api.get('/getDistinctMedNames', function (req, res) {
    _medication2.default.distinct("name", function (err, medNames) {
      if (err) {
        res.send(err);
      }
      medNames.sort();
      res.json(medNames);
    });
  });

  // '/v1/medication/getDistinctTruckNames'
  // Returns the distinct med names.
  api.get('/getDistinctTruckNames', function (req, res) {
    _medication2.default.distinct("truck", function (err, truckNames) {
      if (err) {
        res.send(err);
      }
      truckNames.sort();
      res.json(truckNames);
    });
  });

  // '/v1/medication/getDistinctBoxNames'
  // Returns the distinct med names.
  api.get('/getDistinctBoxNames', function (req, res) {
    _medication2.default.distinct("box", function (err, boxNames) {
      if (err) {
        res.send(err);
      }
      boxNames.sort();
      res.json(boxNames);
    });
  });

  // // '/v1/medication/:id' - Update
  // // Updates a med.
  // api.put('/:id', authenticate, (req, res) => {
  //   Medication.findById(req.params.id, (err, medication) => {
  //     if (err) {
  //       res.send(err);
  //     }
  //     medication.name = req.body.name;
  //     medication.expDate = req.body.expDate;
  //     medication.quantity = req.body.quantity;
  //     medication.box = req.body.box;
  //     medication.truck = req.body.truck;
  //
  //     medication.save(err => {
  //       if (err) {
  //         res.send(err);
  //       }
  //       res.json({message: 'Medication info updated successfully'});
  //     });
  //   });
  // });

  // '/v1/medication/:id' - Update
  // Updates a med.
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.put('/update/:id', function (req, res) {
    _medication2.default.findById(req.params.id, function (err, medication) {
      if (err) {
        res.send(err);
      }
      medication.name = req.body.name;
      medication.expDate = req.body.expDate;
      medication.quantity = req.body.quantity;
      medication.box = req.body.box;
      medication.truck = req.body.truck;

      medication.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Medication info updated successfully' });
      });
    });
  });

  // '/v1/medication/:id' - Delete
  // Deletes a med from the DB
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.delete('/:id', function (req, res) {
    _medication2.default.findById(req.params.id, function (err, medication) {
      if (err) {
        res.status(505).send(err);
        return;
      }
      if (medication === null) {
        res.status(404).send(err);
        return;
      }
      _medication2.default.remove({
        _id: req.params.id
      }, function (err, Medication) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Medication successfully deleted" });
      });
    });
  });

  return api;
};
//# sourceMappingURL=medication.js.map