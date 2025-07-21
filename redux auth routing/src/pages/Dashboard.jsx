import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, <span className="font-bold">{user?.name || 'User'}</span>!</p>
        <p className="mt-2">This is a protected route. You can only see this if you're logged in.</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">User Information</h2>
        <p className="mb-1"><span className="font-semibold">Username:</span> {user?.username}</p>
        <p className="mb-1"><span className="font-semibold">Email:</span> {user?.email}</p>
        <p className="mb-1"><span className="font-semibold">Role:</span> {user?.role}</p>
        <p><span className="font-semibold">ID:</span> {user?.id}</p>
      </div>

    </div>
  );
};

export default Dashboard;
