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
import SupplierLayout from './components/layout/SupplierLayout';
import ProductCategory from './pages/supplier/product/Category';
import ProductSubCategory from './pages/supplier/product/SubCategory';
import ProductListPage from './pages/supplier/product/ProductListPage';
// import PropTypes from 'prop-types';

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
        // {
        //   path: '/profile',
        //   element: <Suppiler />,
        // },
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
    {
      path: '/supplier',
      element: <SupplierLayout />,
      children: [
        {
          path: 'profile',
          element: <Suppiler />,
        },
        {
          path: 'product-category',
          element: <ProductCategory />,
        },
        {
          path: 'product-subcategory',
          element: <ProductSubCategory />,
        },
        {
          path: 'products',
          element: <ProductListPage />,
        },
      ],
    },
  ]);
};

export default router;

// router.propTypes = {
//   isAuth: PropTypes.bool,
//   status: PropTypes.string,
// };
