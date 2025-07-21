import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fakeLoginAPI } from '../features/auth/authApi';
import { login } from '../features/auth/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fakeLoginAPI(username, password);
      if (response.error || !response.user) {
        throw new Error(response.error);
      }
      dispatch(login(response));
      navigate('/dashboard');
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="mt-4 text-sm text-gray-600 p-3 bg-gray-100 rounded">
        <p className="font-semibold mb-2">Demo Credentials:</p>
        <div className="mb-2 p-2 border-l-4 border-blue-500 bg-white">
          <p className="font-medium">Admin User:</p>
          <p>Username: admin</p>
          <p>Password: admin123</p>
          <p className="text-xs text-gray-500 mt-1">Has access to Admin Panel</p>
        </div>
        <div className="p-2 border-l-4 border-green-500 bg-white">
          <p className="font-medium">Regular User:</p>
          <p>Username: user</p>
          <p>Password: user123</p>
          <p className="text-xs text-gray-500 mt-1">Has access to Dashboard only</p>
        </div>
      </div>
    </div>
  );
};

export default Login;