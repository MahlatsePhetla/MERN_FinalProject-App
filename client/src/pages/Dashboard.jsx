import { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';
import axios from 'axios';
import {
  CalendarDays,
  ClipboardList,
  Stethoscope,
  HeartPulse,
  Apple,
  Dumbbell,
  LogOut,
} from 'lucide-react';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/appointments/mine`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  
  const upcomingAppointments = appointments
    .filter(appt => {
      const now = new Date();
      const apptDateTime = new Date(`${appt.date}T${appt.time}`);
      return apptDateTime >= now;
    })
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

  const nextAppointment = upcomingAppointments[0];

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-800">
          Welcome, {user?.name || 'User'}!
        </h2>
        <LogoutButton />
      </div>

      {/* Upcoming Appointment */}
      <section className="mb-6">
        <div className="bg-blue-50 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <CalendarDays className="text-blue-700" size={20} /> Upcoming Appointment
          </h3>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : !nextAppointment ? (
            <p className="text-gray-600">No upcoming appointments.</p>
          ) : (
            <div className="border p-3 bg-white rounded">
              <p><strong>Date:</strong> {nextAppointment.date}</p>
              <p><strong>Time:</strong> {nextAppointment.time}</p>
              <p><strong>Reason:</strong> {nextAppointment.reason || 'N/A'}</p>
            </div>
          )}
        </div>
      </section>

      {/* Action Buttons */}
      <section className="mb-6">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => window.location.href = '/book'}
            className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            <Stethoscope size={18} /> Book New Appointment
          </button>

          <button
            onClick={() => window.location.href = '/appointments'}
            className="flex items-center gap-2 bg-gray-100 border text-blue-700 px-4 py-2 rounded hover:bg-gray-200"
          >
            <ClipboardList size={18} /> View All Appointments
          </button>
        </div>
      </section>

      {/* Recent Appointments (latest 3) */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <ClipboardList className="text-blue-700" size={20} /> Recent Appointments
        </h3>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : appointments.length === 0 ? (
          <p className="text-gray-600">No appointments to display.</p>
        ) : (
          <div className="space-y-2">
            {appointments
              .slice(0, 3)
              .map(appt => (
                <div key={appt._id} className="bg-white p-3 rounded border shadow">
                  <p><strong>Date:</strong> {appt.date}</p>
                  <p><strong>Time:</strong> {appt.time}</p>
                  <p><strong>Reason:</strong> {appt.reason || 'N/A'}</p>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* Health Tips */}
      <section>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <HeartPulse className="text-red-500" size={20} /> Health Tips
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 border rounded bg-white">
            <h4 className="font-bold text-blue-700 flex items-center gap-1">
              <HeartPulse size={16} /> Stay Hydrated
            </h4>
            <p>Drink at least 8 glasses of water daily.</p>
          </div>
          <div className="p-4 border rounded bg-white">
            <h4 className="font-bold text-blue-700 flex items-center gap-1">
              <Dumbbell size={16} /> Regular Exercise
            </h4>
            <p>30 minutes of moderate activity every day.</p>
          </div>
          <div className="p-4 border rounded bg-white">
            <h4 className="font-bold text-blue-700 flex items-center gap-1">
              <Apple size={16} /> Balanced Diet
            </h4>
            <p>Include fruits, vegetables, and whole grains.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;