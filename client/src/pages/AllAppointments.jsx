import { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '../components/LogoutButton';

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/appointments/mine`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAppointments(res.data);
      } catch (err) {
        console.error('Error loading appointments:', err);
        alert(err.response?.data?.message || 'Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    const confirm = window.confirm('Cancel this appointment?');
    if (!confirm) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/appointments/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      console.error('Cancel error:', err);
      alert('Failed to cancel appointment');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-800">
          {user?.name || 'Your'} Appointments
        </h2>
        <LogoutButton className="text-sm" />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-gray-600">No appointments found.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt._id} className="border rounded p-4 shadow bg-white relative">
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Reason:</strong> {appt.reason || 'N/A'}</p>
              <button
                onClick={() => cancelAppointment(appt._id)}
                className="absolute top-4 right-4 text-red-600 hover:underline text-sm"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllAppointments;
