
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const LogoutButton = ({ className = '', icon = true, label = 'Logout' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...'); 
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/'); 
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 text-red-600 hover:text-red-800 ${className}`}
    >
      {icon && <LogOut size={18} />} {label}
    </button>
  );
};

export default LogoutButton;
