import mongoose from 'mongoose';
import { Router } from 'express'
import Medication from '../model/medication';
import MedicationName from '../model/medName';
import TruckName from '../model/truckName'
import BoxName from '../model/boxName'
import bodyParser from 'body-parser';
import passport from 'passport';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  // '/v1/medication/add' - Create
  // This function will add a new med to the DB.
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.post('/add', (req, res) => {
    let newMed = new Medication();
    newMed.name = req.body.name;
    newMed.expDate = req.body.expDate;
    newMed.quantity = req.body.quantity;
    newMed.box = req.body.box;
    newMed.truck = req.body.truck;

    newMed.save(err => {
      if (err){
        res.send(err);
      }
      res.json({message: 'Medication saved successfully'});
    });
  });

  // '/v1/medication' - Read
  // Returns the entire DB.
  api.get('/', (req,res) => {
    Medication.find({}, (err, medications) => {
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

  api.get('/medUsed/:name/:truck/:box', (req, res) => {
    Medication.find({name: req.params.name, truck: req.params.truck, box: req.params.box}, (err, medications) => {
      if (err) {
        res.send(err);
      }
      res.json(medications);
    });
  });

  api.get('/getMedExists/:name/:truck/:box/:expDate', (req, res) => {
    Medication.find({name: req.params.name, truck: req.params.truck, box: req.params.box, expDate: req.params.expDate}, (err, medications) => {
      if (err) {
        res.send(err);
      }
      res.json(medications);
    });
  });

  // Returns all the meds with the specified name in all the trucks. Will also indicate which box they are in.
  api.get('/medUsed/:name', (req, res) => {
    Medication.find({"name": req.params.name}, (err, medications) => {
      if (err) {
        res.send(err);
      }
      res.json(medications);
    });
  });

  // '/v1/medication/getDistinctMedNames'
  // Returns the distinct med names.
  api.get('/getDistinctMedNames', (req, res) =>{
    Medication.distinct(("name"), (err, medNames) => {
      if (err) {
        res.send(err);
      }
      medNames.sort();
      res.json(medNames);
    });
  });

  // '/v1/medication/getDistinctTruckNames'
  // Returns the distinct med names.
  api.get('/getDistinctTruckNames', (req, res) =>{
    Medication.distinct(("truck"), (err, truckNames) => {
      if (err) {
        res.send(err);
      }
      truckNames.sort()
      res.json(truckNames);
    });
  });

  // '/v1/medication/getDistinctBoxNames'
  // Returns the distinct med names.
  api.get('/getDistinctBoxNames', (req, res) =>{
    Medication.distinct(("box"), (err, boxNames) => {
      if (err) {
        res.send(err);
      }
      boxNames.sort()
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
  api.put('/update/:id', (req, res) => {
    Medication.findById(req.params.id, (err, medication) => {
      if (err) {
        res.send(err);
      }
      medication.name = req.body.name;
      medication.expDate = req.body.expDate;
      medication.quantity = req.body.quantity;
      medication.box = req.body.box;
      medication.truck = req.body.truck;

      medication.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({message: 'Medication info updated successfully'});
      });
    });
  });

  // '/v1/medication/:id' - Delete
  // Deletes a med from the DB
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.delete('/:id', (req, res) => {
    Medication.findById(req.params.id, (err, medication) => {
      if (err) {
        res.status(505).send(err);
        return;
      }
      if (medication === null) {
        res.status(404).send(err);
        return;
      }
      Medication.remove({
        _id: req.params.id
      }, (err, Medication) => {
        if (err) {
          res.send(err);
        }
        res.json({message: "Medication successfully deleted"});
      });
    });
  });


  return api;

}
