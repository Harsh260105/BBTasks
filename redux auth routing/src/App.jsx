import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import RoleBasedRoute from './utils/RoleBasedRoute.jsx';
import Layout from './components/Layout';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login", 
        element: <Login />
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "/admin",
        element: (
          <RoleBasedRoute allowedRoles={['admin']}>
            <AdminPanel />
          </RoleBasedRoute>
        )
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={appRouter}/>
  );
} 

export default App;
