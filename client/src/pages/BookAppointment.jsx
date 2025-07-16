import { useState } from 'react';
import axios from 'axios';

const BookAppointment = () => {
  const [formData, setFormData] = useState({ date: '', time: '', reason: '' });
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/appointments`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Appointment booked successfully');
    } catch (err) {
      console.error('Booking failed:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-left text-sm font-semibold">Select Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border p-2 mb-4 rounded" required />

        <label className="block mb-2 text-left text-sm font-semibold">Select Time</label>
        <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full border p-2 mb-4 rounded" required />

        <label className="block mb-2 text-left text-sm font-semibold">Reason / Notes</label>
        <textarea name="reason" rows="3" value={formData.reason} onChange={handleChange} className="w-full border p-2 mb-4 rounded" placeholder="e.g. Headache, check-up, etc." />

        <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">Book Appointment</button>
      </form>
    </div>
  );
};

export default BookAppointment;