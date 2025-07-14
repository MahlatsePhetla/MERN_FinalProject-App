
const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
  const { doctor, date, time } = req.body;
  const exists = await Appointment.findOne({ doctor, date, time });
  if (exists) return res.status(400).json({ msg: 'Time slot already booked' });

  const appointment = await Appointment.create({ patient: req.user.id, doctor, date, time });
  res.status(201).json(appointment);
};

exports.getAppointments = async (req, res) => {
  const appointments = await Appointment.find({ patient: req.user.id });
  res.json(appointments);
};
