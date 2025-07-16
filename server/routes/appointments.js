
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');


router.post('/', auth, async (req, res) => {
  try {
    const { date, time, reason } = req.body;
    const appointment = new Appointment({
      user: req.user._id,
      date,
      time,
      reason,
    });
    await appointment.save();
    res.status(201).json({ message: 'Appointment created', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/mine', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id }).sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);

    if (!appt) return res.status(404).json({ message: 'Appointment not found' });

    
    if (appt.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this appointment' });
    }

    await appt.deleteOne();
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
