import { useSelector } from 'react-redux';

const AdminPanel = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <p className="mb-4">Welcome to the admin panel, {user?.name}!</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">User Management</h2>
        <p>Here you would see admin-only features like user management.</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2">
          Manage Users
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-2">System Settings</h2>
        <p>Only administrators can access system settings.</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2">
          Edit Settings
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;