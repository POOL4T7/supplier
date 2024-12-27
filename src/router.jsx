import { createBrowserRouter } from 'react-router-dom';
import Signin from './pages/Signin';
import Suppiler from './pages/Supplier';
import Layout from './Layout';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import SignupCompletion from './pages/SignupCompletion';
import Admin from './pages/admin/AdminProfile';
import SupplierList from './pages/admin/SupplierList';
import AdminLayout from './components/layout/AdminLayout';

const router = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <LandingPage />,
        },
        {
          path: '/profile',
          element: <Suppiler />,
        },
        {
          path: '/signin',
          element: <Signin />,
        },
        {
          path: '/register',
          element: <Signup />,
        },
        {
          path: '/register-completion',
          element: <SignupCompletion />,
        },
      ],
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        {
          path: 'profile',
          element: <Admin />,
        },
        {
          path: 'supplier-list',
          element: <SupplierList />,
        },
      ],
    },
  ]);
};

export default router;
