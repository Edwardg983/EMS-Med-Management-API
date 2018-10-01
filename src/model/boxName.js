import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let boxNameSchema = new Schema({
name: {
  type: String,
  }
});

module.exports = mongoose.model('BoxName', boxNameSchema);
