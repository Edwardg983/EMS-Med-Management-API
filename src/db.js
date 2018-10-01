import mongoose from 'mongoose';

export default callback => {
  mongoose.Promise = global.Promise;
  let db = mongoose.connect('mongodb://localhost:27017/ems-medication-management-api', {
  useMongoClient: true,
  /* The useMongoClient was required after updating to lastest version of mongoose. Not used in Jack's API course. */
});
  callback(db);
}
