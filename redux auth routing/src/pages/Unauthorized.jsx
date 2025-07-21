import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
      <p className="mb-4">
        Sorry, {user?.name}, you don't have permission to access this page.
      </p>
      <p className="mb-4">
        Your current role is: <span className="font-bold">{user?.role}</span>
      </p>
      <div className="mt-4">
        <Link to="/" className="text-blue-500 hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;