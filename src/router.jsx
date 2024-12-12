import { createBrowserRouter, Navigate } from 'react-router-dom';
import Signin from './pages/Signin';
import Supplier from './pages/Supplier';
import Layout from './layout/OuterLayout';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import SignupCompletion from './pages/SignupCompletion';
import InnerLayout from './layout/InnerLayout';

const router = ({ isLoggedIn }) => {
  return createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <LandingPage />,
        },
        {
          path: 'signin',
          element: isLoggedIn ? <Navigate to='/profile' /> : <Signin />,
        },
        {
          path: 'register',
          element: isLoggedIn ? <Navigate to='/profile' /> : <Signup />,
        },
        {
          path: 'register-completion',
          element: isLoggedIn ? (
            <Navigate to='/profile' />
          ) : (
            <SignupCompletion />
          ),
        },
      ],
    },
    {
      path: '/profile',
      element: isLoggedIn ? <InnerLayout /> : <Navigate to='/signin' />,
      children: [
        {
          path: '',
          element: <Supplier />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to='/' />,
    },
  ]);
};

export default router;
