import mongoose from 'mongoose';
import { Router } from 'express'
import BoxName from '../model/boxName'
import bodyParser from 'body-parser';
import passport from 'passport';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  // '/v1/box/add' - Create
  // This function will add a new box to the DB.
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.post('/add', (req, res) => {
    let newBox = new BoxName();

    newBox.name = req.body.name;
    newBox.save(err => {
      if (err){
        res.send(err);
      }
      res.json({message: 'Box saved successfully'});
    });
  });

  // '/v1/box' - Read
  // Returns the entire DB.
  api.get('/', (req,res) => {
    BoxName.find({}, (err, boxs) => {
      if (err) {
        res.send(err);
      }
      res.json(boxs);
    });
  });

  // '/v1/box/:id' - Read 1
  // Finds a truck by its id.
  api.get('/:id', (req, res) => {
    BoxName.findById(req.params.id, (err, box) => {
      if (err) {
        res.send(err);
      }
      res.json(box);
    });
  });


  // '/v1/box/:id' - Update
  // Updates a box.
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.put('/update/:id', (req, res) => {
    BoxName.findById(req.params.id, (err, box) => {
      if (err) {
        res.send(err);
      }
      box.name = req.body.name;

      box.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({message: 'Box info updated successfully'});
      });
    });
  });

  // '/v1/box/:id' - Delete
  // Deletes a truck from the DB
  // TODO: I'VE DISABLED AUTH TEMP, DON'T FORGET TO ENABLE
  api.delete('/:id', (req, res) => {
    BoxName.findById(req.params.id, (err, box) => {
      if (err) {
        res.status(505).send(err);
        return;
      }
      if (box === null) {
        res.status(404).send(err);
        return;
      }
      BoxName.remove({
        _id: req.params.id
      }, (err, BoxName) => {
        if (err) {
          res.send(err);
        }
        res.json({message: "Box successfully deleted"});
      });
    });
  });


  return api;

}
