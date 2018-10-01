import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let truckNameSchema = new Schema({
name: {
  type: String,
  }
});

module.exports = mongoose.model('TruckName', truckNameSchema);
