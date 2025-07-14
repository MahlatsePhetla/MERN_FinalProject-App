
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctor: String,
  date: String,
  time: String,

});



module.exports = mongoose.model('Appointment', appointmentSchema);
