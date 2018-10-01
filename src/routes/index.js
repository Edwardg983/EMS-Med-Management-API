import express from 'express';
import config from '../config';
import initializeDb from '../db';
import middleware from '../middleware';
import medication from '../controller/medication';
import truck from '../controller/truck';
import box from '../controller/box';

let router = express();

// Connect to db
initializeDb(db => {
  // internal middleware
  router.use(middleware({ config, db}));

  // api routes v1 (/v1)
  router.use('/medication', medication({ config, db }));
  router.use('/truck', truck({ config, db}));
  router.use('/box', box({ config, db}));
});

export default router;
