import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const onStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', onStorageChange);

    return () => {
      window.removeEventListener('storage', onStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/">
        <h1 className="text-2xl font-bold text-blue-700">CareQueue</h1>
      </Link>

      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">
              <button className="text-blue-700 hover:underline">Dashboard</button>
            </Link>
            <button
              className="text-red-600 hover:underline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="border border-gray-300 px-4 py-1 rounded hover:bg-gray-100">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
