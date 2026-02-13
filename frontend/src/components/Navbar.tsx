import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800">Task Manager</h1>
          </div>

          <div className="flex items-center gap-4">
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Admin Panel
              </button>
            )}
            
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm text-gray-600 hover:text-gray-700"
            >
              Dashboard
            </button>

            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded">
              <span className="text-sm text-gray-700">{user?.name}</span>
              <span className="text-xs text-gray-500">({user?.role})</span>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;