import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { logoutAPI } from '../features/auth/authApi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === 'admin';

  return (
    <nav className="bg-gray-800 text-white p-4 w-full flex justify-between items-center">
      <div className="space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        {isAuthenticated && <Link to="/dashboard" className="hover:underline">Dashboard</Link>}
        {isAdmin && <Link to="/admin" className="text-yellow-300 font-bold hover:underline">Admin Panel</Link>}
      </div>
      <div>
        {isAuthenticated ? (
          <button 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={async () => {
              try {
                // Call the API to clear the cookie
                await logoutAPI();
                // Update the Redux state
                dispatch(logout());
              } catch (error) {
                console.error('Logout failed:', error);
              }
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
