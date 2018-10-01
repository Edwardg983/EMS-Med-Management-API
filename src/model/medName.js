import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let medNameSchema = new Schema({
name: {
  type: String,
  }
});

module.exports = mongoose.model('MedicationName', medNameSchema);
