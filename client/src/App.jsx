import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookAppointment from './pages/BookAppointment';
import AllAppointments from './pages/AllAppointments';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute'; 

const Layout = () => (
  <>
    <Navbar />
    <main className="px-4">
      <Outlet />
    </main>
  </>
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Routes wrapped in layout with Navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/book"
            element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <AllAppointments />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
