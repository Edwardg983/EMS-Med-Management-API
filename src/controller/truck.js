import mongoose from 'mongoose';
import { Router } from 'express'
import TruckName from '../model/truckName'
import bodyParser from 'body-parser';
import passport from 'passport';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  // '/v1/truck/add' - Create
  // This function will add a new truck to the DB.
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.post('/add', (req, res) => {
    let newTruck = new TruckName();
    newTruck.name = req.body.name;

    newTruck.save(err => {
      if (err){
        res.send(err);
      }
      res.json({message: 'Truck saved successfully'});
    });
  });

  // '/v1/truck' - Read
  // Returns the entire DB.
  api.get('/', (req, res) => {
    TruckName.find({}, (err, trucks) => {
      if (err) {
        res.send(err);
      }
      res.json(trucks);
      console.log(trucks);
    });
  });

  // '/v1/truck/:id' - Read 1
  // Finds a truck by its id.
  api.get('/:id', (req, res) => {
    TruckName.findById(req.params.id, (err, truck) => {
      if (err) {
        res.send(err);
      }
      res.json(truck);
    });
  });


  // '/v1/truck/:id' - Update
  // Updates a truck.
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.put('/update/:id', (req, res) => {
    TruckName.findById(req.params.id, (err, truck) => {
      if (err) {
        res.send(err);
      }
      truck.name = req.body.name;

      truck.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({message: 'Truck info updated successfully'});
      });
    });
  });

  // '/v1/truck/:id' - Delete
  // Deletes a truck from the DB
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.delete('/:id', (req, res) => {
    TruckName.findById(req.params.id, (err, truck) => {
      if (err) {
        res.status(505).send(err);
        return;
      }
      if (truck === null) {
        res.status(404).send(err);
        return;
      }
      TruckName.remove({
        _id: req.params.id
      }, (err, TruckName) => {
        if (err) {
          res.send(err);
        }
        res.json({message: "Truck successfully deleted"});
      });
    });
  });


  return api;

}
