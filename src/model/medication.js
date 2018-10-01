import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let medicationSchema = new Schema({
name: {
  type: String,
  required: true
},
expDate: {
  type: String,
  required: true
},
truck: {
  type: String,
  required: true
},
box: {
  type: String,
  required: true
},
quantity: {
  type: Number,
  required: true
}
});

module.exports = mongoose.model('Medication', medicationSchema);
